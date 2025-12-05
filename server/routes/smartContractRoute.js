const express = require('express');
const { getSmartContractData } = require('../controllers/smartContractController');

const router = express.Router();

router.route('/smartcontract').get(getSmartContractData);

module.exports = router;
