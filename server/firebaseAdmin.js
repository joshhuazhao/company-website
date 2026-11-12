import admin from 'firebase-admin';
import { readFileSync } from 'node:fs';

const REQUIRED_FIELDS = ['type', 'project_id', 'private_key', 'client_email'];

const HOW_TO_FIX = `
How to fix:
  1. Firebase Console > Project settings > Service accounts > Generate new private key
     and download the JSON file (e.g. save it as ./firebase-service-account.json
     next to docker-compose.yml on the server).
  2. Recommended: set in .env
       FIREBASE_SERVICE_ACCOUNT_FILE=./firebase-service-account.json
     and mount it into the api container (see docker-compose.yml comments).
     No JSON-in-env quoting issues this way.
  3. Alternative: paste the entire downloaded JSON as a single line into
     FIREBASE_SERVICE_ACCOUNT_JSON in .env (single-quote the value) and keep
     the \\n escapes inside private_key exactly as they appear in the file.
  4. Never use the placeholder key from .env.example - it is redacted and
     will always fail with this error.`;

function normalizePrivateKey(key) {
  if (typeof key !== 'string') {
    return key;
  }

  return key
    // Order matters: collapse double-escaped sequences first.
    .replace(/\\\\n/g, '\\n')
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n')
    .trim();
}

function validateServiceAccount(account, source) {
  const problems = [];

  if (!account || typeof account !== 'object') {
    throw new Error(`Invalid Firebase service account (${source}): value is not a JSON object.${HOW_TO_FIX}`);
  }

  for (const field of REQUIRED_FIELDS) {
    if (!account[field]) {
      problems.push(`missing required field "${field}"`);
    }
  }

  const key = account.private_key;
  if (typeof key === 'string') {
    if (key.includes('...')) {
      problems.push('private_key looks like a placeholder (contains "...") - download the real key from the Firebase Console');
    }
    if (!key.includes('-----BEGIN PRIVATE KEY-----')) {
      problems.push('private_key is missing the "-----BEGIN PRIVATE KEY-----" header');
    }
    if (!key.includes('-----END PRIVATE KEY-----')) {
      problems.push('private_key is missing the "-----END PRIVATE KEY-----" footer');
    }
    if (key.includes('\\n')) {
      problems.push('private_key still contains literal \\n sequences after normalization (newlines escaped twice?)');
    }
  }

  if (problems.length) {
    throw new Error(
      `Invalid Firebase service account (${source}):\n  - ${problems.join('\n  - ')}\n${HOW_TO_FIX}`
    );
  }

  return account;
}

function loadServiceAccount() {
  // Preferred: read the service account from a mounted file. This avoids
  // every quoting/escaping problem that plagues JSON inside environment
  // variables.
  const filePath = process.env.FIREBASE_SERVICE_ACCOUNT_FILE;
  if (filePath) {
    let raw;
    try {
      raw = readFileSync(filePath, 'utf8');
    } catch (error) {
      throw new Error(
        `FIREBASE_SERVICE_ACCOUNT_FILE is set to "${filePath}" but the file cannot be read: ${error.message}. ` +
        `If you use Docker, mount the key into the api container first (see docker-compose.yml comments).${HOW_TO_FIX}`
      );
    }

    try {
      return validateServiceAccount(JSON.parse(raw), `file "${filePath}"`);
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error(`File "${filePath}" does not contain valid JSON: ${error.message}${HOW_TO_FIX}`);
      }
      throw error;
    }
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    return null;
  }

  let account;
  try {
    account = JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON: ${error.message}.\n` +
      `Common causes: unbalanced quotes, a line break inside the value, or trailing characters.${HOW_TO_FIX}`
    );
  }

  account.private_key = normalizePrivateKey(account.private_key);

  return validateServiceAccount(account, 'FIREBASE_SERVICE_ACCOUNT_JSON');
}

function getCredential() {
  const serviceAccount = loadServiceAccount();
  if (serviceAccount) {
    return admin.credential.cert(serviceAccount);
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return admin.credential.applicationDefault();
  }

  return undefined;
}

export function initFirebaseAdmin() {
  if (admin.apps.length) {
    return admin.app();
  }

  const credential = getCredential();
  if (!credential) {
    throw new Error(
      'Firebase Admin credentials are required. Set FIREBASE_SERVICE_ACCOUNT_FILE ' +
      '(recommended, a mounted JSON key file) or FIREBASE_SERVICE_ACCOUNT_JSON ' +
      '(the JSON in one line), or GOOGLE_APPLICATION_CREDENTIALS.' + HOW_TO_FIX
    );
  }

  return admin.initializeApp({
    credential,
    projectId: process.env.FIREBASE_PROJECT_ID || 'leanjust-website',
  });
}

export const firebaseAdmin = admin;
