const bcrypt = require("bcrypt")

const User = require("../models/User");

const Product = require("../models/Product")

const Order = require("../models/Order")

const auth = require("../auth")

//USER check email before registration
module.exports.checkEmailExists = ( req, res) => {
	console.log(req.body);
	User.findOne({email: req.body.email})
	.then(result => {
		if(result !== null && result.name === req.body.username){
			return res.send(`The email ${req.body.email} found and already registered. Please use new email`)
		} else {
			return res.send(`Email ${req.body.email} is available. You can now proceed to User Registration Page`)

		}
	})
	.catch(error => res.send(error))
}

//USER registration details
module.exports.registerUser = (req, res) => {

	console.log(req.body);

	const hashedPW = bcrypt.hashSync(req.body.password, 10)

	let newUser = new User({
	
	firstName: req.body.firstName,
	lastName: req.body.lastName,
	email: req.body.email,
	mobileNo: req.body.mobileNo,
	password: hashedPW
	})

	newUser.save()
	.then(user => res.send(user))
	.catch(error => res.send(error))

};


//USER login using email and password
module.exports.loginUser = (req, res) => {
	
	console.log(req.body);
	User.findOne({email: req.body.email})
	.then(foundUser => {
		if(foundUser === null){
			return res.send("User does not exist")
		}else {
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, foundUser.password)

			if(isPasswordCorrect){
				return res.send({accessToken: auth.createAccessToken(foundUser)})
			}else {
				return res.send("Password is incorrect")
			}
		}
	})
	.catch(error => res.send(error))
}


//ADMIN sets USER to Admin
module.exports.updateAdmin = (req, res) => {

	console.log(req.params.id);
	
	let updates = {
		isAdmin: true
	}

	User.findByIdAndUpdate(req.params.id, updates, {new:true})
	.then(updatedUser => res.send(updatedUser))
	.catch(error => res.send(error))


}

//ADMIN delete single user by ID
module.exports.deleteSingleUser = (req, res) => {
	console.log(req.params.id)
	User.deleteOne({_id: req.params.id})
	.then(result => res.send(result))
	.catch(error => res.send(error))

}


//User to update his/her details
module.exports.updateUserDetails = (req, res) => {
	console.log(req.body);
	//check the user id
	console.log(req.user.id);

	let updates = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		mobileNo: req.body.mobileNo
	}

	User.findByIdAndUpdate(req.user.id, updates, {new:true})
	.then(updatedUser => res.send(updatedUser))
	.catch(error => res.send(error))

}

//System Delete all users
module.exports.deleteAllUsers = (req, res) => {
	User.deleteMany({})
	.then(result => res.send(result))
	.catch(error => res.send(error))

}





