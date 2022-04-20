const mongoose = require('mongoose');



let messageSchema =  new mongoose.Schema ({

	sender:
	{
		type: String,
		required: [true, "Sender name is required"]
	},
	receiver:
	{
		type: String,
		required: [true, "Receiver name is required"]
	},
	dateSent:
	{	
		type: Date,
		default: new Date()
	},
	content:
	{
		type: String,
		required: [true, "Content is required"]
	},
	read:
	{
		type: String,
		default: "Unread"
	},
	view:
	{
		type: Date
	}

});

module.exports = mongoose.model("Message", messageSchema)