require('dotenv').config();
const { Worker, Queue } = require('bullmq');
const IORedis = require('ioredis');
const { Pool } = require('pg');

const connection = new IORedis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

const queue = new Queue('default', { connection });

// simple worker processing events queue
const worker = new Worker('default', async job => {
  const { type, payload } = job.data;
  console.log('processing job', type, payload);
  // expand with handlers (badges, persist study logs)
}, { connection });

console.log('worker started');
