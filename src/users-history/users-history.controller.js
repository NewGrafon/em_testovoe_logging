const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { createUserHistory, updateUserHistory, getHistoryByIdWithFilter } = require('./users-history.service.js');
const {pool} = require("../database");
const {CreateUserHistoryDto} = require("./dto/create-user-history.dto");

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());
router.post('/', async (req, res) => {
    pool.query('SELECT 1 FROM users_history WHERE id = $1', [req.body.id], (err, result) => {
        if (err) {
            throw err;
        }

        if (result.rows.length > 0) {
            console.log('updating...');
            updateUserHistory(req, res);
        } else {
            console.log('creating...');
            createUserHistory(req, res);
        }
    });

});

router.get('/:id', async (req, res) => {
    await getHistoryByIdWithFilter(req, res);
});


module.exports = router;