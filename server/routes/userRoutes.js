const { getAllUsers, createUser, login, updateUser, deleteUser, getUser, updateUserProfile } = require("../controllers/userController")
const allowedTo = require("../middleware/allowedTo")
const upload = require("../middleware/storage")
const verifyToken = require("../middleware/verifyToken")
const { user_roles } = require("../tools/rolesConstants")
const router = require("express").Router()

// router.get("/check", isUser)
router.route("/")
    .get(verifyToken, allowedTo(user_roles.ADMIN), getAllUsers)
    .post(verifyToken, allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), createUser)
    .patch(verifyToken, allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), updateUser)
    .put(verifyToken, upload.single("avatar"), updateUserProfile)
    .delete(verifyToken, allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), deleteUser)


router.route("/:userName")
    .get(verifyToken, getUser)
// manage user

router.post("/login", login)
module.exports = router