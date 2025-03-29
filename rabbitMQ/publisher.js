import { AMQPClient } from "@cloudamqp/amqp-client";
import dotenv from "dotenv";

dotenv.config();

async function publishEvent(queueName, message) {
    try {
        const amqp = new AMQPClient(process.env.RABBITMQ_KEY);
        // establish a connection between RabbitMQ instance and the application
        const conn = await amqp.connect()
        const ch = await conn.channel()

        const q = await ch.queue(queueName, {durable: true});
        await q.publish(JSON.stringify(message), {deliveryMode: 2});

        console.log(`✅ Event published to ${queueName}:`, message);
        await conn.close();
    } catch (e) {
        console.error("❌ RabbitMQ Publish Error:", e)
    }
}

export default publishEvent;
