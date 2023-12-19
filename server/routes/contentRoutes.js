const express = require("express")
const { isUser, isAdmin, isAccessed } = require("../middleware/auth")
const { createLecture, getLectures, updateLecture, deleteLecture } = require("../controllers/contentControllers")
const router = express.Router()
const upload = require("../middleware/storage")

router.get("/", isUser, getLectures)
router.post("/add-lecture", isAccessed, upload.fields([{ name: "video" }, { name: "thumbnail" }]), createLecture)
router.put("/update", isAccessed, upload.fields([{ name: "video" }, { name: "thumbnail" }]), updateLecture)
router.delete("/delete", isAccessed, deleteLecture)
module.exports = router