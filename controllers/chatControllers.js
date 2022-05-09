const User = require("../models/User");

const Product = require("../models/Product")

const Order = require("../models/Order")

const Message = require("../models/Message")

const Chat = require("../models/Chat")

const auth = require("../auth")

const createChat = (req, res) => {

let nd = new Date()
let wk = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]

let newChat = new Chat ({
	userName1: req.body.userName1,
	userId1: req.body.userId1,
	userName2: req.body.userName2,
	userId2: req.body.userId2,
	content: req.body.content,
	replies:
	[
	{
		sender: req.body.replies[0].sender,
		receiver: req.body.replies[0].receiver,
		contentA: req.body.replies[0].contentA,
		dateSent: `${wk[nd.getDay()]} ${nd.getHours()-12}:${(nd.getMinutes().length === 1)? `0`+`${nd.getMinutes()}` : `${nd.getMinutes()}`} ${
		(nd.getHours() >= 12)? "PM" : "AM"
	}`
	}
	],
	lastChatDate: `${wk[nd.getDay()]} ${nd.getHours()-12}:${nd.getMinutes()} ${
		(nd.getHours() >= 12)? "PM" : "AM"
	}`
})
	newChat.save()
	.then(chat => res.send(chat))
	.catch(error => res.send(error))

}


const viewChat = (req, res) => {
	Chat.findOne({_id: req.params.id})
	.then(chat => res.send(chat))
	.catch(error => res.send(error))
}

const replyChat = (req, res) => {

	Chat.findOne({_id: req.params.id})
	.then(chat => {
	let nd = new Date()
	let wk = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]

	let newReply = {

			sender: req.body.sender,
			receiver: req.body.receiver,
			contentA: req.body.contentA,
			dateSent: `${wk[nd.getDay()]} ${nd.getHours()-12}:${(nd.getMinutes().length === 1)? `0`+`${nd.getMinutes()}` : `${nd.getMinutes()}`} ${
			(nd.getHours() >= 12)? "PM" : "AM"
		}`

	}

	chat.replies.push(newReply)	
	return chat.save()
	.then(chat => res.send(chat))
	.catch(error => res.send(error))
	})
	.catch(error => res.send(error))
}

const updateDateChat = (req, res) => {
	Chat.findOne({_id: req.params.id})
	.then(chat => {
	let nd = new Date()
	let wk = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]

	let updates = {
		lastChatDate: `${wk[nd.getDay()]} ${nd.getHours()-12}:${(nd.getMinutes().length === 1)? `0`+`${nd.getMinutes()}` : `${nd.getMinutes()}`} ${
			(nd.getHours() >= 12)? "PM" : "AM"
		}`
	}

	Chat.findByIdAndUpdate(req.params.id, updates, {new:true})
	.then(result => res.send(result))
	.catch(error => res.send(error))

	})
	.catch(error => res.send(error))
}

const userChatList = (req,res) => {
	Chat.find({userId1: req.user.id})
	.then(result => {

		if(result.length === 0){
		Chat.find({userId2: req.user.id})
		.then(userId2 => res.send(userId2))
		.catch(error => res.send(error))
		}
		else if (result.length > 0){
			return res.send(result)
		}
		else {
			return res.send("No Chats Available")
		}
	})
	.catch(error => res.send(error))

}


module.exports = {
	createChat,
	viewChat,
	replyChat,
	updateDateChat,
	userChatList
}