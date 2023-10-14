const amqp = require('amqplib/callback_api');

const RMQ_URL = process.env.RABBITMQ_URL;

function RMQ_SendMessage(queue, msg) {
  amqp.connect(RMQ_URL, (error0, connection) => {
    if (error0) {
      throw error0;
    }

    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      channel.assertQueue(queue, {
        durable: false,
      });

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(' [x] Sent %s', msg);

      setTimeout(connection.close(), 500);
    });
  });
}

module.exports = {
  RMQ_SendMessage
}