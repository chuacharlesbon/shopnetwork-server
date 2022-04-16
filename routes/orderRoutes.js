const express = require('express');

const router = express.Router();

const orderControllers = require("../controllers/orderControllers")

const auth = require("../auth");

const {verify, verifyAdmin} = auth;

router.post('/:id', verify, orderControllers.addOrder)

router.get('/thisOrder/:id', verify, orderControllers.thisOrder)

router.get('/getCart', verify, orderControllers.getCart)

router.post('/orderFull/:id', verify, orderControllers.orderFull)

router.get('/getUserOrders', verify, orderControllers.getUserOrders)

router.get('/getAllorders', verify, verifyAdmin, orderControllers.getAllOrders)

router.put('/payOrder/:id', verify, orderControllers.payOrder)

router.put('/cancelOrder/:id', verify, orderControllers.cancelOrder)

router.put('/editOrder/:id', verify, orderControllers.editOrder)

router.put('/approveOrder/:id', verify, verifyAdmin, orderControllers.approveOrder)

/*router.put('/payOrderByProductId/:id', verify, orderControllers.payOrderByProductId)*/

router.delete('/deleteAllOrders', orderControllers.deleteAllOrders)

router.get('/searchOrder/:id', orderControllers.searchOrder)

router.get('/getTotalOrdersByProductId/:id', orderControllers.getTotalOrdersByProductId)





module.exports = router;



