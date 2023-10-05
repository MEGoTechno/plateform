const express = require("express")
const { isUser } = require("../middleware/auth")
const { getExams } = require("../controllers/examController")
const router = express.Router()


router.get("/", isUser, getExams)
module.exports = router