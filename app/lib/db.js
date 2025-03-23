import { createClient } from 'redis';

let client;

if (!global.redisClient) {
  global.redisClient = createClient({
    password: process.env.REDIS_PW,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  global.redisClient.on('error', (err) => console.log('Redis Client Error:', err));

  global.redisClient.connect().then(() => {
    console.log('Redis Connected');

    global.redisClient.info('clients').then((info) => {
      console.log('Client Info:', info);
    }).catch((err) => console.error('Error fetching client info:', err));

  })
}

client = global.redisClient;

export { client };
