const express = require('express');   // web server
const redis = require('redis');       // Redis client

const app = express();

const client = redis.createClient({
  url: 'redis://redis:6379' // connect to Redis default port
});

client.connect(); // open connection

// handle requests to "/"
app.get('/api/count', async (req, res) => {
  let count = await client.get('counter');
  if (!count)
    count = 0;

  count = parseInt(count) + 1;
  await client.set('counter', count);

  res.json({ count });
});

// start server on port 3000
app.listen(3000, () => {
  console.log('App running on port 3000');
});