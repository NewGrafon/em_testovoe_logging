const amqp = require('amqplib/callback_api');
const fetch = require('node-fetch');
const RMQ_URL = process.env.RABBITMQ_URL;
const LOGGING_SERVICE_URL = process.env.LOGGING_SERVICE_URL;

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

                    const sendObj = await fetch(`${LOGGING_SERVICE_URL}/users`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(obj)
                    });
                    console.log(' [x] Fetch result: "%s"', await sendObj.json());
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