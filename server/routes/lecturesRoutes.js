const express = require("express")
const router = express.Router()

const upload = require("../middleware/storage")
const verifyToken = require("../middleware/verifyToken")
const allowedTo = require("../middleware/allowedTo")

const { user_roles } = require("../tools/rolesConstants")
const { createLecture, getLectures, updateLecture, deleteLecture } = require("../controllers/lecturesController")

router.route("/")
    .get(verifyToken, getLectures)
    .post(verifyToken, allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), upload.fields([{ name: "video" }, { name: "thumbnail" }]), createLecture)
    .put(verifyToken, allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), upload.fields([{ name: "video" }, { name: "thumbnail" }]), updateLecture)
    .delete(verifyToken, allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), deleteLecture)

module.exports = router