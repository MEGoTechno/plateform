const express = require("express")
const router = express.Router()
const { getGroups, createGroup, deleteGroup, updateGroup } = require("../controllers/groupsController")
const verifyToken = require("../middleware/verifyToken")

router.route("/")
    .get(verifyToken, getGroups)
    .post(verifyToken, createGroup)
    .patch(verifyToken, updateGroup)
    .delete(verifyToken, deleteGroup)
    
module.exports = router