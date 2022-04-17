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
	stockAvailable: req.body.stockAvailable,
	category: req.body.category,
	remarks: req.body.remarks,
	remark: req.body.remark,
	source: req.body.source
	});


	newProduct.save()
	.then(user => res.send(user))
	.catch(error => res.send(error))

};

//User Search all products in the lists
module.exports.getAllProducts = (req, res) => {
	Product.find({isActive: true}/*, {"createdOn": 0, "isActive": 0, "__v": 0}*/)
	.then(result => res.send(result))
	.catch(error => res.send(error))

}

module.exports.categoryFood = (req, res) => {
	Product.find({category: {$regex: "food", $options: '$i'}}/*, {"createdOn": 0, "isActive": 0, "__v": 0}*/)
	.then(result => res.send(result))
	.catch(error => res.send(error))

}

//ADMIN Search all products in the lists
module.exports.getAllProductsLists = (req, res) => {
	Product.find({})/*.select({"createdOn": 0, "isActive": 0, "__v": 0})*/
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
		price: req.body.price,
		stockAvailable: req.body.stockAvailable,
		remarks: req.body.remarks,
		remark: req.body.remark,
		category: req.body.category,
		source: req.body.source
	}

	Product.findByIdAndUpdate(req.params.id, updates, {new:true})
	.then(result => res.send(result))
	.catch(error => res.send(error))


}

//Archive products with id by Admin only
module.exports.productArchive = (req, res) => {

	console.log(req.params.id);

	let updates = {
		isActive: false
	}

	Product.findByIdAndUpdate(req.params.id, updates, {new:true})
	.then(updatedArchive => res.send(updatedArchive))
	.catch(error => res.send(error))


}

//Activate products with id by Admin only
module.exports.productActivate = (req, res) => {

	console.log(req.params.id);

	let updates = {
		isActive: true
	}

	Product.findByIdAndUpdate(req.params.id, updates, {new:true})
	.then(updatedActive => res.send(updatedActive))
	.catch(error => res.send(error))


}



//Get Active Products by public 
module.exports.getActiveProducts = (req, res) => {
	Product.find({isActive: true})
	.then(result => res.send(result))
	.catch(error => res.send(error))

}


//ADMIN delete single product by ID
module.exports.deleteSingleProduct = (req, res) => {
	console.log(req.params.id)
	Product.deleteOne({_id: req.params.id})
	.then(result => res.send(result))
	.catch(error => res.send(error))

}


/*
CONTROLLER LOCKED

ADMIN Delete all products on lists

module.exports.deleteAllProducts = (req, res) => {
	Product.deleteMany({})
	.then(result => res.send(result))
	.catch(error => res.send(error))
}
*/


//Admin Sync order to product quantity main code
/*module.exports.syncOrders = (req, res) => {
	console.log(req.params.id)
	

	Order.find({"productId": req.params.id, "balance": 0})
	.then(result => {
	if(result.length === 0){
		return res.send(`No completed orders for this Product`)
	}else {
		let order = result
		
		
		order.map(async function(order){

			let updatedProduct = await Product.findById(req.params.id)
			.then(product => {
			console.log(product)
			let newDate = new Date()
			
			let updates = {
				stockAvailable: product.stockAvailable-order.quantity,
				remark: `Product has been sync ${newDate}`
			}

			Product.findByIdAndUpdate(req.params.id, updates, {new:true})
			.catch(error => res.send(error))
			})
			.catch(error => res.send(error))



			let updatedOrder = await Order.findById(order._id)
			.then(oneorder => {
				console.log(oneorder)
				let updates = {
					remarks: "Order has been sync with Stock quantity"
				}
			Order.findByIdAndUpdate(order._id, updates, {new:true})
			.catch(error => res.send(error))
			})
			.catch(error => res.send(error))

			

		})


		
	}
	return "Sync Successful"
	})
	.catch(error => res.send(error))
}
*/

//Admin Sync order to Product By Product ID
/*module.exports.syncOrders = (req, res) => {
	console.log(req.params.id)

	Order.findOne({"productId": req.params.id, "balance": 0})
	.then(order => {
	if(order.length === 0){
		return res.send(`No completed orders for this Product`)
	}else{

	const orderQuantity = order.quantity

	Product.findById(req.params.id)
	.then(result => {
		let updates = {
			stockAvailable: result.stockAvailable-orderQuantity
		}

	Product.findByIdAndUpdate(req.params.id, updates, {new:true})
	.then(result => res.send(result))
	.catch(error => res.send(error))

	})
	.catch(error => res.send(error))

	let order = result
	let updates = {
		stockAvailable: .stockAvailable-order.quantity
		}

	Product.findByIdAndUpdate(req.params.id, updates, {new:true})
	.then(result => res.send(result))
	.catch(error => res.send(error))
}
	})
	.catch(error => res.send(error))
}*/

//Search single product by keyword public
module.exports.getSingleProductByCategory = (req, res) => {
	console.log(req.body)
	Product.find({category: {$regex: req.body.category, $options: '$i'}})
	.then(result => {
		//result.length because the result returned by the find method is array type
		if(result.length === 0){
			return res.send(`No Product ${req.body.category} found. Please check your keyword`)
		}else{
			return res.send(result)
		}
	})
	.catch(error => res.send(error))

}

module.exports.getSingleProductParams = (req, res) => {
	console.log(req.params);
	Product.find({name: {$regex: req.params.id, $options: '$i'}})
	.then(result => {
		if(result !== null){
			return res.send(result)
		} else {
			return res.send(`Product Name ${req.params.id} doesn't exist`)

		}
	})

	/*
	or use simple code:
	.then(result => res.send(result))
	*/


	.catch(error => res.send(error))

};


