const express = require('express');

const router = express.Router();

const productControllers = require("../controllers/productControllers")

const auth = require("../auth")

const {verify, verifyAdmin} = auth;

router.post('/', verify, verifyAdmin, productControllers.addProduct)

router.get('/', /*verify, verifyAdmin,*/ productControllers.getAllProducts)

router.get('/getSingleProduct/:id', productControllers.getSingleProduct)

router.get('/getSingleProductByName', productControllers.getSingleProductByName)

router.put('/:id', verify, verifyAdmin, productControllers.updateProductDetails)

router.put('/archive/:id', verify, verifyAdmin, productControllers.productArchive)

router.get('/getActiveProducts', verify, verifyAdmin, productControllers.getActiveProducts)


module.exports = router;