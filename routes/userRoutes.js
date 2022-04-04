const express = require('express');

const router = express.Router();

const userControllers = require("../controllers/userControllers")

const auth = require("../auth");

const {verify, verifyAdmin} = auth;

router.post('/', userControllers.registerUser)

router.post('/checkEmailExists', userControllers.checkEmailExists)

router.post('/login', userControllers.loginUser)

router.put('/updateAdmin/:id', verify, verifyAdmin, userControllers.updateAdmin)






/*router.get('/', userControllers.getAllUsers)



router.get('/getUserDetails', verify, userControllers.getUserDetails)





router.put("/updateUserDetails", verify, userControllers.updateUserDetails)

router.post("/enroll", verify, userControllers.enroll);

router.get("/getEnrollments", verify, userControllers.getEnrollments)

*/


module.exports = router;