const { initDb, getDb } = require('./src/lib/db'); // adjust path if needed

(async () => {
  try {
    await initDb();
    const db = getDb();
    const result = await db.query('SELECT current_database(), current_user;');
    console.log(result.rows);
  } catch (err) {
    console.error('DB connection error:', err);
  }
})();
