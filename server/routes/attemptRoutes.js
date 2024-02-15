const express = require("express")
const { addAttempt, getUserAttempts } = require("../controllers/attemptsController")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router()


router.route("/")
    .get(verifyToken)
    .post(verifyToken, addAttempt)

router.route("/:userId")
    .get(verifyToken, getUserAttempts)

module.exports = router