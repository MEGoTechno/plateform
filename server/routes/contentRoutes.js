const express = require("express")
const { isUser, isAdmin } = require("../middleware/auth")
const { createLecture, getLectures, updateLecture, deleteLecture } = require("../controllers/contentControllers")
const router = express.Router()
const upload = require("../middleware/storage")

router.get("/", isUser, getLectures)
router.post("/add-lecture", isAdmin, upload.fields([{ name: "video" }, { name: "thumbnail" }]), createLecture)
router.put("/update", isAdmin, updateLecture)
router.delete("/delete", isAdmin, deleteLecture)
module.exports = router