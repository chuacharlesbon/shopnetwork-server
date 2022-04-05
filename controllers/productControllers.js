const Product = require("../models/Product");

const Order = require("../models/Order")

const User = require("../models/User");


//ADD product in the list by admin only
module.exports.addProduct = (req, res) => {

	console.log(req.body);


	let newProduct = new Product({
	
	name: req.body.name,
	description: req.body.description,
	price: req.body.price,
	});


	newProduct.save()
	.then(user => res.send(user))
	.catch(error => res.send(error))

};

//Search all products in the lists
module.exports.getAllProducts = (req, res) => {
	Product.find({})
	.then(result => res.send(result))
	.catch(error => res.send(error))


}

//Search single product by id
module.exports.getSingleProduct = (req, res) => {
	console.log(req.params);
	Product.findById(req.params.id)
	.then(result => {
		if(result !== null){
			return res.send(result)
		} else {
			return res.send(`Product ID ${req.params.id} doesn't exist`)

		}
	})

	/*
	or use simple code:
	.then(result => res.send(result))
	*/


	.catch(error => res.send(error))

};

//Search single product by keyword public
module.exports.getSingleProductByName = (req, res) => {
	console.log(req.body)
	Product.find({name: {$regex: req.body.name, $options: '$i'}})
	.then(result => {
		//result.length because the result returned by the find method is array type
		if(result.length === 0){
			return res.send(`No Product ${req.body.name} found. Please check your keyword`)
		}else{
			return res.send(result)
		}
	})
	.catch(error => res.send(error))

}

//Update product details by Admin only
module.exports.updateProductDetails = (req, res) => {

	console.log(req.params.id);
	console.log(req.body);

	let updates = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	}

	Product.findByIdAndUpdate(req.params.id, updates, {new:true})
	.then(result => res.send(result))
	.catch(error => res.send(error))


}

//Archive products by Admin only
module.exports.productArchive = (req, res) => {

	console.log(req.params.id);

	let updates = {
		isActive: false
	}

	Product.findByIdAndUpdate(req.params.id, updates, {new:true})
	.then(updatedArchive => res.send(updatedArchive))
	.catch(error => res.send(error))


}

//Get Active Products by public
module.exports.getActiveProducts = (req, res) => {
	Product.find({isActive: true})
	.then(result => res.send(result))
	.catch(error => res.send(error))


}




