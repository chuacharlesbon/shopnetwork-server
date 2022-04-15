const express = require('express');

const router = express.Router();

const userControllers = require("../controllers/userControllers")

const auth = require("../auth");

const {verify, verifyAdmin} = auth;

router.post('/register', userControllers.registerUser)

router.post('/checkEmailExists', userControllers.checkEmailExists)

router.post('/login', userControllers.loginUser)

//router.post('/detail', userControllers.retrieveUserDetails)

router.post("/details", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization)
		
	userControllers.getProfile({userId : userData.id}).then(resultFromController => res.send(resultFromController));

});

router.put('/updateAdmin/:id', verify, verifyAdmin, userControllers.updateAdmin)

router.put("/updateUserDetails", verify, userControllers.updateUserDetails)

router.delete('/deleteSingleUser/:id', verify, verifyAdmin, userControllers.deleteSingleUser)

router.delete('/deleteAllUsers', userControllers.deleteAllUsers)

module.exports = router;