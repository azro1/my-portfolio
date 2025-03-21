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

    // Now, let's run the info command for checking connections
    global.redisClient.info('clients').then((info) => {
      console.log('Client Info:', info);
    }).catch((err) => console.error('Error fetching client info:', err));

    // Running CONFIG GET maxclients
    global.redisClient.configGet('maxclients').then((result) => {
      console.log('Max Clients Config:', result);
    }).catch((err) => console.error('Error fetching maxclients:', err));
  }).catch((err) => console.error('Redis Connection Error:', err));
}

client = global.redisClient;

export { client };
