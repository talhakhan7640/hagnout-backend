import { AMQPClient } from "@cloudamqp/amqp-client";
import { io } from "../server.js";

let queue;

async function consumeEvents(queueName) {
    queue = queueName;
    try {
        const amqp = new AMQPClient("amqps://bwnqlrir:mrtMVAdGWlkGxPPo6j8pWriTJZahmcUE@leopard.lmq.cloudamqp.com/bwnqlrir");
        const conn = await amqp.connect();
        const ch = await conn.channel();

        const q = await ch.queue(queueName, { durable: true });
        console.log(`👂 Listening for ${queueName} events...`);

        const consumer = await q.subscribe({ noAck: true }, async (msg) => {
            const data = JSON.parse(msg.bodyToString());
            console.log(`📥 Received ${queueName} event:`, data);

            io.emit(queueName, data);
        });

        await consumer.wait();
    } catch (err) {
        console.error("❌ RabbitMQ Consumer Error:", err);
        setTimeout(() => consumeEvents(queueName), 1000);
    }
}

consumeEvents(queue);
