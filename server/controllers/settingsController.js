const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const dotenv = require("dotenv")
const SettingsModel = require("../models/SettingsModel")

// config
dotenv.config()
const DB_URI = process.env.MONGO_URI

const getSettings = asyncHandler(async (req, res) => {
    await mongoose.connect(DB_URI)
    const settings = await SettingsModel.find({}).select("-_id").select("-__v")
    if (settings) {
        res.status(200).json(settings)
        mongoose.disconnect()
    } else {
        res.status(404).json({ message: "create a new group" })
    }
})

const postSettings = asyncHandler(async (req, res) => {
    await mongoose.connect(DB_URI)
    const newSettings = req.body
    const sameGradeId = await SettingsModel.findOne({ gradeId: newSettings.gradeId })
    if (sameGradeId) {
        res.status(400)
        throw new Error("grade already found")
    }
    await SettingsModel.create(newSettings)
    res.json({ message: `${req.body.gradeName} has been created successfully` })
    mongoose.disconnect()
})

const updateSetting = asyncHandler(async (req, res) => {
    await mongoose.connect(DB_URI)
    const updatedSetting = req.body
    await SettingsModel.updateOne({ gradeId: updatedSetting.gradeId }, updatedSetting)
    res.status(200).json({ message: `${req.body.gradeName} has been updated successfully` })
    mongoose.disconnect()
})

const deleteSetting = asyncHandler(async (req, res) => {
    await mongoose.connect(DB_URI)
    const setting = req.body
    await SettingsModel.deleteOne({ gradeId: setting.gradeId })
    res.status(200).json({ message: `${req.body.gradeName} has been deleted successfully` })
    mongoose.disconnect()
})
module.exports = { getSettings, postSettings, updateSetting, deleteSetting }