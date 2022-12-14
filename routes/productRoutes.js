const express = require('express');

const router = express.Router();

const productControllers = require("../controllers/productControllers")

const auth = require("../auth")

const {verify, verifyAdmin} = auth;

router.post('/', verify, verifyAdmin, productControllers.addProduct)

router.get('/', productControllers.getAllProducts)

router.get('/getAllProductsLists', verify, verifyAdmin, productControllers.getAllProductsLists)

router.get('/getSingleProduct/:id', productControllers.getSingleProduct)

router.get('/getSingleProductParams/:id', productControllers.getSingleProductParams)

router.get('/getSingleProductByName', productControllers.getSingleProductByName)

router.get('/getSingleProductByCategory', productControllers.getSingleProductByCategory)

router.get('/categoryFood', productControllers.categoryFood)

router.get('/categoryClothing', productControllers.categoryClothing)

router.get('/categoryMachines', productControllers.categoryMachines)

router.put('/:id', verify, productControllers.updateProductDetails)

router.put('/archive/:id', verify, verifyAdmin, productControllers.productArchive)

router.put('/activate/:id', verify, verifyAdmin, productControllers.productActivate)

router.get('/getActiveProducts', productControllers.getActiveProducts)

router.delete('/deleteSingleProduct/:id', verify, verifyAdmin, productControllers.deleteSingleProduct)

//router.put('/syncOrders/:id', verify, productControllers.syncOrders)

/*
Route Locked:
router.delete('/deleteAllProducts/:id', verify, verifyAdmin, productControllers.deleteAllProducts)
*/


module.exports = router;