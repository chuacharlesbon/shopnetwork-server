const bcrypt = require("bcrypt")

const User = require("../models/User");

const Product = require("../models/Product")

const Order = require("../models/Order")

const Message = require("../models/Message")

const auth = require("../auth")

module.exports.createMessage = (req, res) => {

	console.log(req.body);

	let newMessage = new Message({
	
	sender: req.body.sender,
	receiver: req.body.receiver,
	content: req.body.content

	});

	newMessage.save()
	.then(user => res.send(user))
	.catch(error => res.send(error))

};