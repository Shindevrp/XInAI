const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


const { getDb } = require('../lib/db');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ error: 'Email and password required' });
  try {
    const db = getDb();
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }
    const user = result.rows[0];
    if (!user.password) {
      return res.status(401).send({ error: 'No password set for this user' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }
    // Remove password from user object before signing
    const { password: _, ...userData } = user;
    const token = jwt.sign(userData, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
    res.send({ token, user: userData });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send({ error: 'Internal server error' });
  }
});

module.exports = router;
