const express = require('express');
const router = express.Router();
const { getDb } = require('../lib/db');
const { authMiddleware } = require('../middleware/auth');

router.get('/health', async (req, res) => res.send({ ok: true }));

router.get('/courses/count', authMiddleware, async (req, res) => {
  const db = getDb();
  const { rows } = await db.query('SELECT count(*) FROM courses');
  res.send(rows[0]);
});

module.exports = router;
