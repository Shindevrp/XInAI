const express = require('express');
const router = express.Router();
const { getRedis } = require('../lib/redis');

// simple XP and leaderboard in Redis
router.post('/xp', async (req, res) => {
  const { userId, xp } = req.body;
  if (!userId || !xp) return res.status(400).send({ error: 'userId and xp required' });
  const redis = getRedis();
  await redis.zincrby('leaderboard', xp, userId);
  await redis.publish('events', JSON.stringify({ type: 'gamify:xp', userId, xp }));
  res.send({ status: 'ok' });
});

router.get('/leaderboard', async (req, res) => {
  const redis = getRedis();
  const rows = await redis.zrevrange('leaderboard', 0, 9, 'WITHSCORES');
  const parsed = [];
  for (let i = 0; i < rows.length; i += 2) parsed.push({ userId: rows[i], xp: rows[i+1] });
  res.send(parsed);
});

module.exports = router;
