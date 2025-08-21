const Redis = require('ioredis');
let client;

async function initRedis() {
  client = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
  client.on('connect', () => console.log('Redis connected'));
}

function getRedis() {
  if (!client) throw new Error('Redis not initialized');
  return client;
}

module.exports = { initRedis, getRedis };
