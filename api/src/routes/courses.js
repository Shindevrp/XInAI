const express = require('express');
const router = express.Router();
const { getDb } = require('../lib/db');
const { authMiddleware } = require('../middleware/auth');

// simple courses CRUD using Postgres
router.get('/', async (req, res) => {
  const db = getDb();
  const { rows } = await db.query('SELECT id, title, description FROM courses LIMIT 100');
  res.send(rows);
});

router.post('/', authMiddleware, async (req, res) => {
  const db = getDb();
  const { title, description } = req.body;
  const { rows } = await db.query('INSERT INTO courses(title, description) VALUES($1,$2) RETURNING id, title, description', [title, description]);
  res.status(201).send(rows[0]);
});

module.exports = router;
