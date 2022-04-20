const express = require('express');

const router = express.Router();

const auth = require("../auth");

const {verify, verifyAdmin} = auth;

const messageControllers = require("../controllers/messageControllers")

router.post('/',  messageControllers.createMessage)

router.get('/', verify, verifyAdmin, messageControllers.adminViewMessage)

router.get('/readMessages', verify, verifyAdmin, messageControllers.adminViewRead)

router.put('/markRead/:id' , verify, verifyAdmin, messageControllers.markRead)


module.exports = router;
