const Product = require("../models/Product");

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