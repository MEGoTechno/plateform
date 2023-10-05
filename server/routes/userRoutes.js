const { getAllUsers, addUser, login } = require("../controllers/userController")
const {isAdmin, isUser} = require("../middleware/auth")
const router = require("express").Router()

// router.get("/check", isUser)
router.get("/", isAdmin, getAllUsers)
router.post("/add-user", isAdmin, addUser)
router.post("/login", login)

module.exports = router