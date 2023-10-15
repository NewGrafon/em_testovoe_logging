const amqp = require('amqplib/callback_api');
const {selectHandledToMessage} = require("../users-history/users-history.service");
const RMQ_URL = process.env.RABBITMQ_URL;

function RMQ_ReceiveMessage(queue) {
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

            console.log(
                ' [*] Waiting for messages in "%s". To exit press CTRL+C',
                queue,
            );
            channel.consume(
                queue,
                async (msg) => {
                    const obj = JSON.parse(msg.content.toString());
                    console.log(' [x] Received "%s"', obj);

                    console.log(' [x] Log result: "%s"', await selectHandledToMessage(obj));
                },
                {
                    noAck: true,
                },
            );
        });
    });
}

module.exports = {
    RMQ_ReceiveMessage
}