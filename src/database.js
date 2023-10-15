const pg = require('pg');

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

async function initTable() {
    const tableExists = (await pool.query(`SELECT EXISTS (
                                SELECT FROM 
                                    pg_tables
                                WHERE 
                                    schemaname = 'public' AND 
                                    tablename  = 'users_history'
                                )`)).rows[0].exists;

    if (!tableExists) {
        pool.query(
            `CREATE TABLE
                    users_history(
                    id integer NOT NULL,
                    currentName varchar NOT NULL,
                    currentSurname varchar NOT NULL,
                    currentCity varchar NOT NULL,
                    currentAge integer NOT NULL,
                    history JSON[] NOT NULL,
                    updatedAt timestamp NOT NULL
                    )
                `);
    }
}

module.exports = {
    pool,
    initTable
};