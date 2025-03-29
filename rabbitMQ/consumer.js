import { AMQPClient } from "@cloudamqp/amqp-client";
import dotenv from "dotenv";

dotenv.config();

async function consumeEvents(io) {
  try {
    const amqp = new AMQPClient(
      process.env.RABBITMQ_KEY
    );
    const conn = await amqp.connect();
    const ch = await conn.channel();

    const q = await ch.queue("song_change", { durable: true });
    console.log(`👂 Listening for "song_change" events...`);

    const consumer = await q.subscribe({ noAck: true }, async (msg) => {
      const data = JSON.parse(msg.bodyToString());
      console.log(`📥 Received song_change event:`, data);

      io.to(data.roomId).emit('song_change', {trackName : data.trackName, trackUrl : data.trackUrl});
    });

    await consumer.wait();
  } catch (err) {
    console.error("❌ RabbitMQ Consumer Error:", err);
    setTimeout(() => consumeEvents(io), 1000);
  }
}

export default consumeEvents;
