const mongoose = require('mongoose');

let productSchema =  new mongoose.Schema ({
	name:
	{
		type: String,
		required: [true, "Product name is required"]
	},
	description:
	{
		type: String,
		required: [true, "Description is required"]
	},
	price:
	{
		type: Number,
		required: [true, "Price is required"]
	},
	stockAvailable:
	{
		type: Number
	},
	isActive:
	{
		type: Boolean,
		default: true
	},
	createdOn:
	{
		type: Date,
		default: new Date()
	}
	/*
	category:
	{
		type: String,
		required: [true, "Product Category is required"]
	}
	orders: [
	{
		userId:
		{
			type: String,
			required: [true, "User ID is required"]
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
			//Pending|ForDelivery|Completed
		},
		dateOrder:
		{
			type: Date,
			default: new Date()
		}

	}
	]*/


});

module.exports = mongoose.model("Product", productSchema)