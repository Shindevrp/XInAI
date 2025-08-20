const { initDb, getDb } = require('./src/lib/db');
const bcrypt = require('bcryptjs');

async function createDefaultUser() {
  await initDb();
  const db = getDb();
  const email = 'admin@inai.com';
  const password = 'admin123';
  const name = 'Admin';
  const role = 'Admin';
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if user exists
  const existing = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    console.log('Default admin user already exists.');
    await db.end();
    return;
  }

  // Insert user (add password column if needed)
  try {
    await db.query(
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS password TEXT;`
    );
    await db.query(
      `INSERT INTO users (email, name, role, password) VALUES ($1, $2, $3, $4)`,
      [email, name, role, hashedPassword]
    );
    console.log('Default admin user created:');
    console.log({ email, password });
  } catch (err) {
    console.error('Error creating default user:', err);
  } finally {
    await db.end();
  }
}

createDefaultUser();
