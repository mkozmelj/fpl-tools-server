import { createClient } from 'redis';

// Create a Redis client
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

// Connect to Redis
redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () =>
  console.log('Successfully connected to Redis server..'),
);

(async () => {
  try {
    console.log('Connecting to redis client');
    await redisClient.connect();
  } catch (err) {
    console.log(err);
  }
})();

export default redisClient;
