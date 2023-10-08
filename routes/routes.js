const express = require('express');
const controller = require('../controller/controller');

const router = express.Router();



router.post('/storeOrders', controller.storeOrders);

router.get('/getAllData', controller.getAllOrders);

router.get('/filter', controller.filter);


module.exports = router;