const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "First Name is required"]
	},
	lastName: {
		type: String,
		required: [true, "Last Name is required"]
	},
	email: {
		type: String,
		required: [true, "Email is required"]
	},
	password: {
		type: String,
		required: [true, "Password is required"]
	},
	mobileNo: {
		type: String,
		required: [true, "Mobile Number is required"]
	},
	isAdmin: {
		type: Boolean,
		default: false
	}/*,
	orders: [
		{
			productName: String
		},
		{
			quantity: Number
		},
		{
			dateOrder: {
				type: Date,
				default: new Date()
			}
		}
	]*/
	/*buyerOrSeller : {
		type: String,
		required: [true, "Indicate if you are a Buyer or Seller"]
	}
	orders: [
		{
			productId: {
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
			}
			status: {
				type: String,
				default: "Pending"
				//Pending|ForDelivery|Completed
			},
			dateOrder: {
				type: Date,
				default: new Date()
			}
		}
	]*/
});




module.exports = mongoose.model("User", userSchema)

