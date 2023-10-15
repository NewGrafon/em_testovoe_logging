const { pool } = require("../database.js");
const { CreateUserHistoryDto } = require("./dto/create-user.dto.js");
const {UserHistoryEntity} = require("./entities/user-history-item.entity");

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
    const filter = {
        id: req.query.id,
        offset: Number.parseInt(req.query.offset) || 1,
        limit: Number.parseInt(req.query.limit) || 5
    };
    if (
        filter.id
        && filter.limit >= 0
        && filter.offset >= 1
    ) {
        const sliceString = `${ filter.limit !== 0 ? '[$1:$2]' : '[$1:]' }`;
        const history = (await pool.query(
            `SELECT history${sliceString} FROM users_history WHERE id = $3`,
            [filter.offset, filter.offset+filter.limit-1, filter.id]
        ))?.rows[0]?.history;

        return res.status(200).json(history || []);
    }

    res.status(404).json([]);
}

module.exports = {
    createUserHistory,
    updateUserHistory,
    getHistoryByIdWithFilter
}