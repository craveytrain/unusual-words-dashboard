if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import { createClient, RedisClient, Multi } from 'redis';
import { promisifyAll } from 'bluebird';

const redisUrl = process.env.REDIS_URL;

if ( !redisUrl ) throw('No REDIS_URL');

promisifyAll(RedisClient.prototype);
promisifyAll(Multi.prototype);

const client = createClient( redisUrl );

client.on('connect', () => console.log( `Redis connected at ${redisUrl}` ) );

export default client;
