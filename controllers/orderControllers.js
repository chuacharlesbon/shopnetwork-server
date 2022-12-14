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
	let itemName = result.name

	let total = req.body.quantity*itemPrice

	let newOrder = new Order({

		userId: req.user.id,
		username: req.user.username,
		productId: req.params.id,
		productName: itemName,
		quantity: req.body.quantity,
		totalPrice: total,
		balance: total
		//status for carts is pending value
	})

	newOrder.save()
	.then(user => res.send(user))
	.catch(error => res.send(error))
	})
	.catch(error => res.send(error))

}


module.exports.orderFull = (req, res) => {
	console.log(req.user)
	console.log(req.params.id)

	Product.findById(req.params.id)
	.then(result => {
	let itemPrice = result.price
	let itemName = result.name

	let total = req.body.quantity*itemPrice

	let newOrder = new Order({

		userId: req.user.id,
		username: req.user.username,
		productId: req.params.id,
		productName: itemName,
		quantity: req.body.quantity,
		totalPrice: total,
		balance: total-req.body.payment,
		payment: req.body.payment,
		cardType: req.body.cardType,
		cardNumber: req.body.cardNumber,
		remarks: "Payment has been confirmed. Ready for shipping",
		status: "For Delivery"
	})

	newOrder.save()
	.then(user => res.send(user))
	.catch(error => res.send(error))
	})
	.catch(error => res.send(error))

}

//User get All his/her orders
module.exports.getUserOrders = (req, res) => {
	Order.find({userId: req.user.id, payment: {$gt: 0}, dateCancelled: ''})
	.then(result => res.send(result))
		/*if(result.length === 0){
			console.log(result)
			return false
		}else{
			return res.send(result)
		}*/
	
	.catch(error => res.send(error))
}

module.exports.getCart = (req, res) => {
	Order.find({userId: req.user.id, "status": "Pending" })
	.then(result => res.send(result))
		/*if(result.length === 0){
			console.log(result)
			return false
		}else{
			return res.send(result)
		}*/
	
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
		//quantity: 0,
		totalPrice: 0,
		status: "Cancelled by User",
		dateCancelled: new Date(),
		remarks: "If payment was made, refund will be process accordingly",
		admin: "Waiting for Approval"
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
	/*let itemPrice = result.totalPrice/result.quantity
	let total = req.body.quantity*itemPrice*/

	let updates = {
		admin: req.body.admin,
		byAdmin: req.body.byAdmin
		/*quantity: req.body.quantity,
		totalPrice: total,
		balance: total*/
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
				admin: "Refund request approved. Process might take 3-5 banking days."
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

module.exports.thisOrder = (req, res) => {
	Order.find({ _id: req.params.id})
	.then(result => res.send(result))
	.catch(error => res.send(error))

}

module.exports.searchOrderId = (req, res) => {
	Order.find({_id: req.params.id})
	.then(result => res.send(result))
	.catch(error => res.send(error))

}

module.exports.getUserTransactions = (req, res) => {
	Order.find({userId: req.user.id, balance: 0})
	.then(result => res.send(result))
		/*if(result.length === 0){
			console.log(result)
			return false
		}else{
			return res.send(result)
		}*/
	
	.catch(error => res.send(error))
}
