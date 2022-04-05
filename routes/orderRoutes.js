const express = require('express');

const router = express.Router();

const orderControllers = require("../controllers/orderControllers")

const auth = require("../auth");

const {verify, verifyAdmin} = auth;

router.post('/:id', verify, orderControllers.addOrder)

router.get('/getUserOrders', verify, orderControllers.getUserOrders)

router.get('/getAllorders', verify, verifyAdmin, orderControllers.getAllOrders)

router.put('/payOrder/:id', verify, orderControllers.payOrder)

router.put('/cancelOrder/:id', verify, orderControllers.cancelOrder)

module.exports = router;



