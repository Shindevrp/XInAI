const express = require('express');
const router = express.Router();
const { getDb } = require('../lib/db');
const { getRedis } = require('../lib/redis');

// record study logs; simple design: write to Redis for quick aggregation, persist via worker
router.post('/log', async (req, res) => {
  const { userId, checkpointId, duration } = req.body;
  if (!userId || !duration) return res.status(400).send({ error: 'userId and duration required' });
  const redis = getRedis();
  const key = `study:${userId}`;
  await redis.rpush(key, JSON.stringify({ checkpointId, duration, ts: Date.now() }));
  // increment daily streak counter
  await redis.incr(`study:duration:${userId}`);
  // emit event channel
  await redis.publish('events', JSON.stringify({ type: 'study:log', userId, checkpointId, duration }));
  res.status(202).send({ status: 'accepted' });
});

module.exports = router;
