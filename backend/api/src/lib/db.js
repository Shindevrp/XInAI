const { Pool } = require('pg');
let pool;

require('dotenv').config();
async function initDb() {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
  await pool.query('SELECT 1');
  console.log('Postgres connected');
}

function getDb() {
  if (!pool) throw new Error('DB not initialized');
  return pool;
}

module.exports = { initDb, getDb };
