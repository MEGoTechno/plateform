const express = require("express")
const { isUser, isAdmin } = require("../middleware/auth")
const { getExams, createExam, updateExam, deleteExam } = require("../controllers/examController")
const router = express.Router()


router.get("/", isUser, getExams)
router.post("/add-exam", isAdmin, createExam)
router.put("/update", isAdmin, updateExam)
router.delete("/delete", isAdmin, deleteExam)
module.exports = router