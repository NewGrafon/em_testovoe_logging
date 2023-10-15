const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { createUserHistory, updateUserHistory, getHistoryByIdWithFilter } = require('./users-history.service.js');
const {pool} = require("../database");
const {CreateUserHistoryDto} = require("./dto/create-user.dto");
const {UpdateUserHistoryDto} = require("./dto/update-user.dto");

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());
router.get('/:id', async (req, res) => {
    await getHistoryByIdWithFilter(req, res);
});


module.exports = router;