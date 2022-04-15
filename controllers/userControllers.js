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
	/*return newUser.save()
	.then((user, error) => {
		if (error){
			return false
		}else {
			return user
		}
	})*/
	.then(user => res.send(user))
	.catch(error => res.send(error))
	/*.catch(error => {
		console.log(error)
		return false
	})*/

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
				//res.send({accessToken: auth.createAccessToken(foundUser)})
				return res.send({accessToken: auth.createAccessToken(foundUser)})
			}else {
				return res.send("Password is incorrect")
			}
		}
	})
	.catch(error => res.send(error))
}


module.exports.getProfile = (data) => {

	return User.findById(data.userId).then(result => {

		// Changes the value of the user's password to an empty string when returned to the frontend
		// Not doing so will expose the user's password which will also not be needed in other parts of our application
		// Unlike in the "register" method, we do not need to call the mongoose "save" method on the model because we will not be changing the password of the user in the database but only the information that we will be sending back to the frontend application
		result.password = "";

		// Returns the user information with the password as an empty string
		return result;

	});

};

/*module.exports.retrieveUserDetails = (req, res) => {
	const userData = auth.decode(req.headers.authorization)
	let userId = userData.id

	return User.findById(.userId).then(result => {
		result.password = ""
		return 
	})


}*/




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





