const { pool } = require("../database.js");
const { UserHistoryEntity } = require("./entities/user-history-item.entity");
const { HistoryEntity } = require("./entities/history.entity");

const createUserHistory = async (user, res) => {
    const userAsHistoryItem = new UserHistoryEntity(user);
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

const updateUserHistory = async (updateUserData, res) => {
    const userHistory = (await pool.query(
        `SELECT history FROM users_history WHERE id = $1`,
        [updateUserData.id]
    )).rows[0].history;
    const userAsHistoryItem = new UserHistoryEntity(updateUserData);
    userHistory.push(userAsHistoryItem);
    const userValue = [userAsHistoryItem.name, userAsHistoryItem.surname, userAsHistoryItem.city, userAsHistoryItem.age, userHistory, userAsHistoryItem.updatedAt, updateUserData.id];
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
    const id = Number.parseInt(req.query.id.toString());
    const offset = Number.parseInt(req.query.offset.toString()) || 1;
    let limit = Number.parseInt(req.query.limit.toString());
    limit = limit > 0 ? limit : 5;
    if (
        id
        && offset >= 1
        && limit >= 0
    ) {
        const history = (await pool.query(
            `SELECT array_length(history, 1), history[$1:$2] FROM users_history WHERE id = $3`,
            [offset, offset+limit-1, id]
        ))?.rows[0];

        return res.status(200).json(history ? new HistoryEntity(history.history, offset, limit, history.array_length) : {});
    }

    res.status(404).json(false);
}

module.exports = {
    createUserHistory,
    updateUserHistory,
    getHistoryByIdWithFilter
}