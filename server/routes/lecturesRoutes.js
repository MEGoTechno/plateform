const express = require("express")
const { createLecture, getLectures, updateLecture, deleteLecture } = require("../controllers/lecturesController")

const router = express.Router()
const upload = require("../middleware/storage")
const verifyToken = require("../middleware/verifyToken")
const allowedTo = require("../middleware/allowedTo")
const { user_roles } = require("../tools/rolesConstants")

router.get("/", verifyToken, getLectures)
router.post("/add-lecture", verifyToken, allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), upload.fields([{ name: "video" }, { name: "thumbnail" }]), createLecture)
router.put("/update", verifyToken, allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), upload.fields([{ name: "video" }, { name: "thumbnail" }]), updateLecture)
router.delete("/delete", verifyToken, allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), deleteLecture)

module.exports = router