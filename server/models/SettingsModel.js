const mongoose = require("mongoose")

const SettingSchema = mongoose.Schema({
    gradeId: {type: String},
    gradeName: {type: String}
})

const SettingsModel = mongoose.model("settings", SettingSchema)
module.exports = SettingsModel