const express = require("express")
const { getMessages, sendMessage, updateMessage, deleteMessage } = require("../controllers/messagesController")
const router = express.Router()

const verifyToken = require("../middleware/verifyToken")

router.route("/")
    .get(verifyToken, getMessages)
    .post(verifyToken, sendMessage)
    .patch(verifyToken, updateMessage)
    .delete(verifyToken, deleteMessage)

module.exports = router