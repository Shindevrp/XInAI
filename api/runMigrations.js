const fs = require('fs');
const path = require('path');
const { initDb, getDb } = require('./src/lib/db');

async function runMigrations() {
  await initDb();
  const db = getDb();
  const sql = fs.readFileSync(path.join(__dirname, 'migrations.sql'), 'utf8');
  try {
    await db.query(sql);
    console.log('Migrations ran successfully!');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await db.end();
  }
}

runMigrations();
