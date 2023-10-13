require('dotenv').config();

const express = require('express');
const pg = require('pg');
const typeorm = require('typeorm');
const path = require("node:path");

const __filename = require('node:url').fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(require("body-parser").urlencoded({ extended: true }));
app.set('trust proxy', true);

const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_POPT | 5432,
    logging: true,
    synchronize: true,
});
async function start() {
    try {
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Logging service available on PORT: ${PORT}`);
        });
    } catch (e) {
        throw new Error(e);
    }
}

start();

