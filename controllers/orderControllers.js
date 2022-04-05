const Order = require("../models/Order");

const Product = require("../models/Product")

const User = require("../models/User");

//User orders item
module.exports.addOrder = (req, res) => {
	console.log(req.user)
	console.log(req.params.id)

	Product.findById(req.params.id)
	.then(result => {
	let itemPrice = result.price

	let total = req.body.quantity*itemPrice

	let newOrder = new Order({

		userId: req.user.id,
		productId: req.params.id,
		quantity: req.body.quantity,
		totalPrice: total

	})

	newOrder.save()
	.then(user => res.send(user))
	.catch(error => res.send(error))
	})
	.catch(error => res.send(error))

}


//User All his/her orders
module.exports.getUserOrders = (req, res) => {
	Order.find({userId: req.user.id})
	.then(result => res.send(result))
	.catch(error => res.send(error))
}

//Admin get all product orders
module.exports.getAllOrders = (req, res) => {
	Order.find({})
	.then(result => res.send(result))
	.catch(error => res.send(error))
}

//User pay order by ID
module.exports.payOrder = (req, res) => {
	console.log(req.user.id)
	console.log(req.params.id)
	console.log(req.body);

	Order.findById(req.params.id)
	.then(result => {
	if (result.userId === req.user.id ){
	let netPrice = result.totalPrice-req.body.payment

	if(netPrice === 0){

	let updates = {
		payment: req.body.payment,
		balance: netPrice,
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




