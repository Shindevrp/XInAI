const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// NOTE: For MVP we mock IdP. Replace with Firebase/Supabase/Auth0 integration.
router.post('/login', (req, res) => {
  const { email, name } = req.body;
  if (!email) return res.status(400).send({ error: 'email required' });
  const user = { id: uuidv4(), email, name: name || email.split('@')[0], role: 'Student' };
  const token = jwt.sign(user, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
  res.send({ token, user });
});

module.exports = router;
