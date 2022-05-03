const mongoose = require('mongoose');

let chatSchema =  new mongoose.Schema ({

	userId1:
	{
		type: String,
		required: [true, "User ID 1 is required"]
	},
	userName1:
	{
		type: String,
		required: [true, "User name 1 is required"]
	},
	userId2:
	{
		type: String,
		required: [true, "User ID 2 is required"]
	},
	userName2:
	{
		type: String,
		required: [true, "User name 2 is required"]
	},
	content:
	{
		type: String,
		required: [true, "Content field is required"]
	},
	replies: [
	{
		sender:
		{
			type: String,
			required: [true, "Sender field is required"]
		},
		receiver:
		{
			type: String,
			required: [true, "Receiver field is required"]
		},
		contentA:
		{
			type: String,
			required: [true, "ContentA field is required"]
		},
		dateSent:
		{
			type: String,
			required: [true, "Date Sent field is required"]
		},
		view:
		{
			type: String,
			default: "Unread"
		}
	}
	],
	lastChatDate:
	{
		type: String,
		required: [true, "Last Chat Date field is required"]
	}

});


module.exports = mongoose.model("Chat", chatSchema)