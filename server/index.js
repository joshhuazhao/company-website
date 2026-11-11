import 'dotenv/config';
import express from 'express';
import { initDb, pool } from './db.js';
import { firebaseAdmin, initFirebaseAdmin } from './firebaseAdmin.js';

const app = express();
const port = process.env.API_PORT || 3001;

app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
    res.set('X-Content-Type-Options', 'nosniff');
    next();
});

initFirebaseAdmin();
await initDb();

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter (no external dependencies).
// Authenticated profile traffic is per-user; health checks stay unlimited.
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 60;
const rateBuckets = new Map();

function rateLimit(req, res, next) {
    const key = req.ip || 'unknown';
    const now = Date.now();
    const bucket = rateBuckets.get(key) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

    if (now > bucket.resetAt) {
        bucket.count = 0;
        bucket.resetAt = now + RATE_LIMIT_WINDOW_MS;
    }

    bucket.count += 1;
    rateBuckets.set(key, bucket);

    res.set('X-RateLimit-Limit', String(RATE_LIMIT_MAX));
    res.set('X-RateLimit-Remaining', String(Math.max(0, RATE_LIMIT_MAX - bucket.count)));

    if (bucket.count > RATE_LIMIT_MAX) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    return next();
}

// Periodically prune stale buckets so the map cannot grow without bound.
setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of rateBuckets) {
        if (now > bucket.resetAt + RATE_LIMIT_WINDOW_MS) {
            rateBuckets.delete(key);
        }
    }
}, RATE_LIMIT_WINDOW_MS).unref();

app.use('/api', rateLimit);

const MAX_FIELD_LENGTH = 200;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim().slice(0, MAX_FIELD_LENGTH);
  return trimmed.length ? trimmed : null;
}

function isEmailValid(email) {
  return typeof email === 'string' && email.length <= 254 && EMAIL_RE.test(email);
}

function splitDisplayName(displayName) {
  const parts = clean(displayName)?.split(/\s+/) || [];
  return {
    firstName: parts[0] || null,
    lastName: parts.length > 1 ? parts.slice(1).join(' ') : null,
  };
}

function toClient(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    firebaseUid: row.firebase_uid,
    firstName: row.first_name || '',
    lastName: row.last_name || '',
    email: row.email || '',
    phoneNumber: row.phone_number || '',
    companyName: row.company_name || '',
    address: row.address || '',
    city: row.city || '',
    country: row.country || '',
  };
}

async function requireFirebaseUser(req, res, next) {
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  if (!token) {
    return res.status(401).json({ error: 'Missing authentication token.' });
  }

  try {
    req.firebaseUser = await firebaseAdmin.auth().verifyIdToken(token);
    return next();
  } catch (error) {
    console.error('Firebase token verification failed', error);
    return res.status(401).json({ error: 'Invalid authentication token.' });
  }
}

async function ensureMarketClient(firebaseUser) {
  const email = clean(firebaseUser.email);
  if (!email) {
    const error = new Error('Your Google account must include an email address.');
    error.statusCode = 400;
    throw error;
  }

  const names = splitDisplayName(firebaseUser.name);
  const result = await pool.query(
    `
      INSERT INTO market_client (firebase_uid, first_name, last_name, email)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (firebase_uid)
      DO UPDATE SET
        email = EXCLUDED.email,
        first_name = COALESCE(market_client.first_name, EXCLUDED.first_name),
        last_name = COALESCE(market_client.last_name, EXCLUDED.last_name),
        updated_at = NOW()
      RETURNING *
    `,
    [firebaseUser.uid, names.firstName, names.lastName, email]
  );

  return result.rows[0];
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/profile/bootstrap', requireFirebaseUser, async (req, res) => {
  try {
    const row = await ensureMarketClient(req.firebaseUser);
    res.status(201).json({ profile: toClient(row) });
  } catch (error) {
    console.error('Profile bootstrap failed', error);
    res.status(error.statusCode || 500).json({ error: error.message || 'Unable to create profile.' });
  }
});

app.get('/api/profile', requireFirebaseUser, async (req, res) => {
  try {
    const row = await ensureMarketClient(req.firebaseUser);
    res.json({ profile: toClient(row) });
  } catch (error) {
    console.error('Profile fetch failed', error);
    res.status(error.statusCode || 500).json({ error: error.message || 'Unable to load profile.' });
  }
});

app.put('/api/profile', requireFirebaseUser, async (req, res) => {
  const payload = {
    firstName: clean(req.body.firstName),
    lastName: clean(req.body.lastName),
    email: clean(req.body.email),
    phoneNumber: clean(req.body.phoneNumber),
    companyName: clean(req.body.companyName),
    address: clean(req.body.address),
    city: clean(req.body.city),
    country: clean(req.body.country),
  };

  // The verified e-mail from the Firebase ID token is the identity of the
  // record; a client-supplied e-mail is never trusted or persisted.
  const verifiedEmail = clean(req.firebaseUser.email);

  if (!verifiedEmail || !isEmailValid(verifiedEmail)) {
    return res.status(400).json({ error: 'A valid e-mail address on your Google account is required.' });
  }

  payload.email = verifiedEmail;

  try {
    const result = await pool.query(
      `
        INSERT INTO market_client (
          firebase_uid,
          first_name,
          last_name,
          email,
          phone_number,
          company_name,
          address,
          city,
          country
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (firebase_uid)
        DO UPDATE SET
          first_name = EXCLUDED.first_name,
          last_name = EXCLUDED.last_name,
          email = EXCLUDED.email,
          phone_number = EXCLUDED.phone_number,
          company_name = EXCLUDED.company_name,
          address = EXCLUDED.address,
          city = EXCLUDED.city,
          country = EXCLUDED.country,
          updated_at = NOW()
        RETURNING *
      `,
      [
        req.firebaseUser.uid,
        payload.firstName,
        payload.lastName,
        payload.email,
        payload.phoneNumber,
        payload.companyName,
        payload.address,
        payload.city,
        payload.country,
      ]
    );

    res.json({ profile: toClient(result.rows[0]) });
  } catch (error) {
    console.error('Profile update failed', error);
    res.status(500).json({ error: 'Unable to save profile.' });
  }
});

// Centralized error handler for anything that slipped through.
app.use((err, req, res, next) => {
  console.error('Unhandled API error', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(port, () => {
  console.log(`Profile API listening on port ${port}`);
});
