import { AMQPClient } from "@cloudamqp/amqp-client";

async function consumeEvents(io) {
  try {
    const amqp = new AMQPClient(
      "amqps://bwnqlrir:mrtMVAdGWlkGxPPo6j8pWriTJZahmcUE@leopard.lmq.cloudamqp.com/bwnqlrir"
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
