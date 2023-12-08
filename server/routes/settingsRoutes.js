const express = require("express")
const router = express.Router()
const { getSettings, postSettings, updateSetting, deleteSetting } = require("../controllers/settingsController")
const { isAdmin } = require("../middleware/auth")

router.route("/").get(isAdmin, getSettings).post(isAdmin, postSettings).put(isAdmin, updateSetting).delete(isAdmin, deleteSetting)
module.exports = router