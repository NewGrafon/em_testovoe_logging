require('dotenv').config();

const express = require('express');
const path = require("node:path");
const usersRouter = require("./users-history/users-history.controller.js");
const bodyParser = require('body-parser');
const { RMQ_ReceiveMessage } = require("./rabbitmq/recieve");
const { initTable } = require("./database");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.set('trust proxy', true);


async function bootstrap() {
    try {
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, async () => {
            await initTable();
            RMQ_ReceiveMessage('logging');
            console.log(`Logging service available on PORT: ${PORT}`);
        });
    } catch (e) {
        throw new Error(e);
    }
}

bootstrap();

app.use('/users', usersRouter);
