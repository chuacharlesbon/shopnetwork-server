const mongoose = require('mongoose');

let orderSchema =  new mongoose.Schema ({

		userId:
		{
			type: String,
			required: [true, "User ID is required"]
		},
		username:
		{
			type: String,
			required: [true, "User Name is required"]
		},
		productId:  {
			type: String,
			required: [true, "Product ID is required"]
		},
		productName:  {
			type: String
		},
		quantity:  {
			type: Number,
			required: [true, "Quantity is required"]
		},
		totalPrice: {
			type: Number,
			required: [true, "Price is required"]
		},
		payment:
		{
			type: Number
		},
		balance:
		{
			type: Number
		},
		cardType:
		{
			type: String
		},
		cardNumber:
		{
			type: String
		},
		remarks:
		{
			type: String
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
		}
});

module.exports = mongoose.model("Order", orderSchema)