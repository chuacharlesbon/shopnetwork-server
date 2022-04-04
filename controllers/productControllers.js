const Product = require("../models/Product");

//ADD product in the list
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