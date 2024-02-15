const express = require("express")
const router = express.Router()
const { getGrades, createGrade, updateGrade, deleteGrade } = require("../controllers/gradesController")
const verifyToken = require("../middleware/verifyToken")

router.route("/")
    .get(verifyToken, getGrades)
    .post(verifyToken, createGrade)
    .patch(verifyToken, updateGrade)
    .delete(verifyToken, deleteGrade)


module.exports = router