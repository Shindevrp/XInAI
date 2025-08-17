const express = require('express');
const router = express.Router();
const { getRedis } = require('../lib/redis');

// simple message history in Redis list per room
router.post('/message', async (req, res) => {
  const { room, userId, text } = req.body;
  if (!room || !userId || !text) return res.status(400).send({ error: 'room,userId,text required' });
  const redis = getRedis();
  const msg = { room, userId, text, ts: Date.now() };
  await redis.rpush(`chat:${room}`, JSON.stringify(msg));
  await redis.publish('events', JSON.stringify({ type: 'chat:message', ...msg }));
  res.status(201).send({ status: 'ok' });
});

router.get('/history/:room', async (req, res) => {
  const redis = getRedis();
  const rows = await redis.lrange(`chat:${req.params.room}`, 0, -1);
  res.send(rows.map(r => JSON.parse(r)));
});

module.exports = router;
