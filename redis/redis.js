import { createClient } from "redis";

const redisClient = createClient({
    username: 'default',
    password: 'astYQUT6BoWAf6dZ5SfDT2vmkRGGHOFo',
    socket: {
        host: 'redis-19417.c265.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 19417
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect();

export default redisClient;
