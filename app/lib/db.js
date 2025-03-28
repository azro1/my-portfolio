import { createClient } from 'redis';

let client;

if (process.env.NODE_ENV === 'development') {
  // Only initialize once in development mode
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
      console.log('Redis Connected in Development');
      global.redisClient.info('clients').then((info) => {
        console.log('Client Info:', info);
      }).catch((err) => console.error('Error fetching client info:', err));
    });
  }

  client = global.redisClient;
} else {
  // Handle Redis connection for production or other environments
  client = createClient({
    password: process.env.REDIS_PW,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  client.on('error', (err) => console.log('Redis Client Error:', err));

  client.connect().then(() => {
    console.log('Redis Connected in Production');
    client.info('clients').then((info) => {
      console.log('Client Info:', info);
    }).catch((err) => console.error('Error fetching client info:', err));
  });
}

export { client };

