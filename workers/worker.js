require('dotenv').config();
const IORedis = require('ioredis');
const Queue = require('bullmq').Queue;

const connection = new IORedis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
const queue = new Queue('default', { connection });

async function main(){
  console.log('workers ready. listening to events channel');
  const sub = new IORedis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
  await sub.subscribe('events');
  sub.on('message', async (chan, message) => {
    const event = JSON.parse(message);
    console.log('event received', event.type);
    // push to processing queue for reliable processing
    await queue.add('event', { type: event.type, payload: event });
  });
}

main().catch(err => { console.error(err); process.exit(1) });
