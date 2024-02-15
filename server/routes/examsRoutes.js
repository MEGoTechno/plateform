const express = require("express")
const { getExams, createExam, updateExam, deleteExam, getOneExam } = require("../controllers/examController")
const upload = require("../middleware/storage")
const allowedTo = require("../middleware/allowedTo")
const { user_roles } = require("../tools/rolesConstants")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router()


router.route("/")
    .get(verifyToken, getExams)
    .post(verifyToken, allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), createExam)
    .patch(verifyToken, allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), updateExam)
    .delete(verifyToken, allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), deleteExam)

router.route("/:id")
    .get(verifyToken, getOneExam)

module.exports = router