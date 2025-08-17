require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { initDb } = require('./lib/db');
const { initRedis } = require('./lib/redis');
const apiRoutes = require('./routes');
const { initSocket } = require('./lib/socket');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 4000;

async function start() {
  await initDb();
  const server = app.listen(PORT, () => console.log(`API running on ${PORT}`));
  await initRedis();
  initSocket(server);
  app.use('/api', apiRoutes);
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
