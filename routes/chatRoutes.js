const express = require('express');

const router = express.Router();

const auth = require("../auth");

const {verify, verifyAdmin} = auth;

const chatControllers = require("../controllers/chatControllers");

router.post('/newChat', verify, chatControllers.createChat)

router.get('/viewChat/:id', verify, chatControllers.viewChat)

router.post('/replyChat/:id', verify, chatControllers.replyChat)

router.put('/updateDateChat/:id', verify, chatControllers.updateDateChat)

router.get('/userChatList', verify, chatControllers.userChatList)


module.exports = router;
