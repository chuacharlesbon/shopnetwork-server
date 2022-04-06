const Order = require("../models/Order");

const Product = require("../models/Product")

const User = require("../models/User");

//User orders an item by product id
module.exports.addOrder = (req, res) => {
	console.log(req.user)
	console.log(req.params.id)

	Product.findById(req.params.id)
	.then(result => {
	let itemPrice = result.price

	let total = req.body.quantity*itemPrice

	let newOrder = new Order({

		userId: req.user.id,
		username: req.user.username,
		productId: req.params.id,
		quantity: req.body.quantity,
		totalPrice: total,
		balance: total
	})

	newOrder.save()
	.then(user => res.send(user))
	.catch(error => res.send(error))
	})
	.catch(error => res.send(error))

}

//User get All his/her orders
module.exports.getUserOrders = (req, res) => {
	Order.find({userId: req.user.id})
	.then(result => {
		if(result.length === 0){
			return res.send(`Hello! ${req.user.username}. You have no pending orders`)
		}else{
			return res.send(result)
		}
	})
	.catch(error => res.send(error))
}

//Admin get all product orders
module.exports.getAllOrders = (req, res) => {
	Order.find({})
	.then(result => {
		if(result.length === 0){
			return res.send("This shop has no pending orders")
		}else{
			return res.send(result)
		}
	})
	.catch(error => res.send(error))
}

//User pay order by order ID
module.exports.payOrder = (req, res) => {
	console.log(req.user.id)
	console.log(req.params.id)
	console.log(req.body);

	Order.findById(req.params.id)
	.then(result => {
	if (result.userId === req.user.id ){
	let netPrice = result.balance-req.body.payment

	if(netPrice === 0){

	let updates = {
		payment: req.body.payment,
		balance: netPrice,
		cardType: req.body.cardType,
		cardNumber: req.body.cardNumber,
		status: "Payment Accepted. Preparing For Delivery"
	}
	Order.findByIdAndUpdate(req.params.id, updates, {new:true})
	.then(user => res.send(user))
	.catch(error => res.send(error))
	}else{
		let updates = {
		payment: req.body.payment,
		balance: netPrice,
		status: "Payment Accepted. Please complete the balance for the approval of shipping"
	}
	Order.findByIdAndUpdate(req.params.id, updates, {new:true})
	.then(user => res.send(user))
	.catch(error => res.send(error))
	}
	}else {
		return res.send("This is not your Order")
	}
	})
	.catch(error => res.send(error))

}

//User to cancel order By id
module.exports.cancelOrder = (req, res) => {

	console.log(req.user.id)
	console.log(req.params.id)

	Order.findById(req.params.id)
	.then(result => {
	if (result.userId === req.user.id ){

	let updates = {
		quantity: 0,
		totalPrice: 0,
		status: "Cancelled by User",
		dateCancelled: new Date(),
		remarks: "If payment was made, refund will be process accordingly"
	}
	Order.findByIdAndUpdate(req.params.id, updates, {new:true})
	.then(user => res.send(user))
	.catch(error => res.send(error))
	}else {
		return res.send("This is not your Order")
	}
	})
	.catch(error => res.send(error))

}
//USER edit order by id
module.exports.editOrder = (req, res) => {

	console.log(req.user.id)
	console.log(req.params.id)
	console.log(req.body)

	Order.findById(req.params.id)
	.then(result => {
	if (result.userId === req.user.id ){
	let itemPrice = result.totalPrice/result.quantity
	let total = req.body.quantity*itemPrice

	let updates = {
		quantity: req.body.quantity,
		totalPrice: total,
		balance: total
	}
	Order.findByIdAndUpdate(req.params.id, updates, {new:true})
	.then(user => res.send(user))
	.catch(error => res.send(error))
	}else {
		return res.send("This is not your Order")
	}
	})
	.catch(error => res.send(error))

}

//Admin update quantity and update order status
module.exports.approveOrder = (req, res) => {
	console.log(req.params.id)

	Order.findById(req.params.id)
		.then(order => {
			console.log(order)
			let updates = {
				status: "Product already for Shipping"
			}
			Order.findByIdAndUpdate(req.params.id, updates, {new:true})
			.then(user => res.send(user))
			.catch(error => res.send(error))
		})
}


//User Pay order by product Id
/*module.exports.payOrderByProductId = (req, res) => {
	console.log(req.params.id)

	Order.findOne({"userId": req.user.id, "productId": req.params.id})
	.then(order => {
	console.log(order)
	const orderId = order._id
	let netPrice = order.balance-req.body.payment

	if(netPrice === 0){

	let updates = {
		payment: req.body.payment,
		balance: netPrice,
		status: "Payment Accepted. Preparing For Delivery"
	}
	
	Order.findByIdAndUpdate(orderId, updates, {new:true})
	.then(user => res.send(user))
	.catch(error => res.send(error))

	}else{
		let updates = {
		payment: req.body.payment,
		balance: netPrice,
		status: "Payment Accepted. Please complete the balance for the approval of shipping"
	}
	}
	

	})
	.catch(error => res.send(error))
}*/

//System Delete all orders
module.exports.deleteAllOrders = (req, res) => {
	Order.deleteMany({})
	.then(result => res.send(result))
	.catch(error => res.send(error))

}

module.exports.searchOrder = (req, res) => {
	Order.find({"productId": req.params.id, "balance": 0, "remarks": null})
	.then(result => res.send(result))
	.catch(error => res.send(error))

}

//Admin get Total order per product
module.exports.getTotalOrdersByProductId = (req, res) => {
	Order.find({"productId": req.params.id, "balance": 0})
	.then(result => {
	if(result.length === 0){
		return res.send(`No completed orders for this Product`)
	}else{
		return res.send(result)
	}
	}) 
	.catch(error => res.send(error))

}


