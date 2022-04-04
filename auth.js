const jwt = require('jsonwebtoken');
const secret = "ECommerceAPI";

module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}
return jwt.sign(data, secret, {/*option*/})
}

module.exports.verify = (req, res, next) => {
//contains sensitive data and especially token
	let token = req.headers.authorization
	console.log(token)
	if(typeof token === "undefined"){
		return res.send({auth: "Failed. No Token"})
	} else {
		token = token.slice(7, token.length)
		//Bearer uiedhuihsfhff
		jwt.verify(token, secret, (err, decodedToken) => {
			if(err){
				return res.send({
					auth: "Failed",
					message: err.message
				})
			} else {
				req.user = decodedToken;
				next()
			}
		})
	}
};

module.exports.verifyAdmin = (req, res, next) => {

	if (req.user.isAdmin){
		next()
	} else {
		return res.send({
			auth: "Failed",
			message: "Forbidden Action"
		})
	}

}

