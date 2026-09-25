import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS market_client (
      id BIGSERIAL PRIMARY KEY,
      firebase_uid TEXT NOT NULL UNIQUE,
      first_name TEXT,
      last_name TEXT,
      email TEXT NOT NULL,
      phone_number TEXT,
      company_name TEXT,
      address TEXT,
      city TEXT,
      country TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_market_client_email
      ON market_client (email);
  `);
}
