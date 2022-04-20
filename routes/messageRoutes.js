const express = require('express');

const router = express.Router();

const auth = require("../auth");

const {verify, verifyAdmin} = auth;

const messageControllers = require("../controllers/messageControllers")

router.post('/',  messageControllers.createMessage)

router.post('/newMessage', verify,  messageControllers.userSendMessage)

router.get('/', verify, verifyAdmin, messageControllers.adminViewMessage)

router.get('/readMessages', verify, verifyAdmin, messageControllers.adminViewRead)

router.get('/readClearMessages', verify, messageControllers.userViewClear)

router.get('/userMessages', verify, messageControllers.userViewMessage)

router.put('/markRead/:id' , verify, messageControllers.markRead)


module.exports = router;
