const express = require("express")
const { addAttempt, getUserAttempts } = require("../controllers/attemptsController")
const verifyToken = require("../middleware/verifyToken")
const { getUsersStatistics, getExamStatistics, getHomeStatistics } = require("../controllers/statisticsController")
const router = express.Router()


router.route("/users")
    .get(verifyToken, getUsersStatistics)

router.route("/exam")
    .get(verifyToken, getExamStatistics)

router.route("/home")
    .get(verifyToken, getHomeStatistics)

module.exports = router