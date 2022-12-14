const bcrypt = require("bcrypt")

const User = require("../models/User");

const Product = require("../models/Product")

const Order = require("../models/Order")

const Message = require("../models/Message")

const auth = require("../auth")

module.exports.createMessage = (req, res) => {

	console.log(req.body);

	let newdate = new Date()

	let newMessage = new Message({
	
	sender: req.body.sender,
	receiver: req.body.receiver,
	content: req.body.content,
	dateSent: `${newdate}`

	});

	newMessage.save()
	.then(user => res.send(user))
	.catch(error => res.send(error))

};

module.exports.userSendMessage = (req, res ) => {

	console.log(req.body)

	let newdate = new Date()

	let newMessage = new Message({

		sender: req.user.email,
		receiver: req.body.receiver,
		content: req.body.content,
		dateSent: `${newdate}`
	});
	newMessage.save()
	.then(user => res.send(user))
	.catch(error => res.send(error))
	

}

module.exports.adminViewMessage = (req, res) => {

	Message.find({receiver: "Admin", read: "Unread"})
	.then(result => res.send(result))
	.catch(error => res.send(error))
}

module.exports.adminViewRead = (req, res) => {

	Message.find({receiver: "Admin", read: "Read"})
	.then(result => res.send(result))
	.catch(error => res.send(error))
}

module.exports.markRead = (req, res) => {
	console.log(req.params.id);
	let newdate = new Date()

	let updates = {
		read: "Read",
		view: `${newdate}`
	}

	Message.findByIdAndUpdate(req.params.id, updates, {new:true})
	.then(result => res.send(result))
	.catch(error => res.send(error))

}

module.exports.userViewMessage = (req, res) => {
	console.log(req.user.email)

	Message.find({receiver: req.user.email, read: "Unread"})
	.then(result => res.send(result))
	.catch(error => res.send(error))
}

module.exports.userViewClear = (req, res) => {

	Message.find({receiver: req.user.email, read: "Read"})
	.then(result => res.send(result))
	.catch(error => res.send(error))
}

module.exports.deleteMessage = (req, res) => {
	Message.deleteOne({_id: req.params.id})
	.then(result => res.send(result))
	.catch(error => res.send(error))

}
