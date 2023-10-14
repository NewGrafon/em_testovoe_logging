const { pool } = require("../database.js");
const { CreateUserHistoryDto } = require("./dto/create-user-history.dto.js");
const {UserHistoryEntity} = require("./entities/user-history.entity");

const createUserHistory = async (req, res) => {
    const user = new CreateUserHistoryDto(req.body);
    const userAsHistoryItem = new UserHistoryEntity(req.body);
    const userValue = [user.id, userAsHistoryItem.name, userAsHistoryItem.surname, userAsHistoryItem.city, userAsHistoryItem.age, [userAsHistoryItem], user.updatedAt];
    pool.query(
        'INSERT INTO users_history (id, currentName, currentSurname, currentCity, currentAge, history, updatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        userValue,
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json(false);
            }
            console.log('create was successful!');
            res.status(200).json(result.rows[0]);
        }
    );
}

const updateUserHistory = async (req, res) => {
    const user = (await pool.query('SELECT * FROM users_history WHERE id = $1', [req.body.id])).rows[0];
    const userAsHistoryItem = new UserHistoryEntity(req.body);
    user.history.push(userAsHistoryItem);
    const userValue = [userAsHistoryItem.name, userAsHistoryItem.surname, userAsHistoryItem.city, userAsHistoryItem.age, user.history, userAsHistoryItem.updatedAt, user.id];
    pool.query(
        `UPDATE users_history 
            SET currentName = $1, currentSurname = $2, currentCity = $3, currentAge = $4, history = $5, updatedAt = $6 
            WHERE id = $7
            RETURNING *`,
        userValue,
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json(false);
            }
            console.log('update was successful!');
            res.status(200).json(result.rows[0]);
        }
    )
}

const getHistoryByIdWithFilter = async (req, res) => {
    const filter = {

    };
}

module.exports = {
    createUserHistory,
    updateUserHistory,
    getHistoryByIdWithFilter
}