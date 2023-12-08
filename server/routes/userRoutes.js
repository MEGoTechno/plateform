const { getAllUsers, addUser, login, updateUser, deleteUser, getUser } = require("../controllers/userController")
const { isAdmin, isUser } = require("../middleware/auth")
const router = require("express").Router()

// router.get("/check", isUser)
router.get("/", isAdmin, getAllUsers)
router.get("/:id", isAdmin, getUser)

// manage user
router.put("/update-user", isAdmin, updateUser)
router.delete("/delete-user", isAdmin, deleteUser)

router.post("/add-user", isAdmin, addUser)
router.post("/login", login)
module.exports = router