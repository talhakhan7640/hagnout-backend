import { createClient } from "redis";
import dotenv from 'dotenv';

dotenv.config();

const url = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSKEY}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

const redisClient = createClient(url);

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect();

export default redisClient;
