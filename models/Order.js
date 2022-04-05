const mongoose = require('mongoose');

let orderSchema =  new mongoose.Schema ({

		userId:
		{
			type: String,
			required: [true, "User ID is required"]
		},
		productId:  {
			type: String,
			required: [true, "Product ID is required"]
		},
		quantity:  {
			type: Number,
			required: [true, "Quantity is required"]
		},
		totalPrice: {
			type: Number,
			required: [true, "Price is required"]
		},
		status:
		{
			type: String,
			default: "Pending"
			//Pending|ForDelivery|Completed|Cancelled
		},
		dateOrder:
		{
			type: Date,
			default: new Date()
		},
		dateCancelled:
		{
			type: Date
		},
		payment:
		{
			type: Number
		},
		balance:
		{
			type: Number
		},
		remarks:
		{
			type: String
		}

});

module.exports = mongoose.model("Order", orderSchema)