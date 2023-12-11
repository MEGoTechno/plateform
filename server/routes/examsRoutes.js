const express = require("express")
const { isUser, isAdmin, isAccessed } = require("../middleware/auth")
const { getExams, createExam, updateExam, deleteExam } = require("../controllers/examController")
const router = express.Router()


router.get("/", isUser, getExams)
router.post("/add-exam", isAccessed, createExam)
router.put("/update", isAccessed, updateExam)
router.delete("/delete", isAccessed, deleteExam)
module.exports = router