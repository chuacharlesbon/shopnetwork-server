const express = require('express');

const router = express.Router();

const auth = require("../auth");

const {verify, verifyAdmin} = auth;

const messageControllers = require("../controllers/messageControllers")

router.post('/',  messageControllers.createMessage)




module.exports = router;
