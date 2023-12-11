const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const dotenv = require("dotenv")
const ContentModel = require("../models/contentModel")

// config
dotenv.config()
const DB_URI = process.env.MONGO_URI

// fcs
// create lecture
const createLecture = asyncHandler(async (req, res) => {
    await mongoose.connect(DB_URI)
    const lecture = req.body
    const foundLecture = await ContentModel.find({ partId: lecture.partId })
    if (foundLecture[0]) {
        res.status(400)
        mongoose.disconnect()
        throw new Error("there is lecture has same id")
    }
    const { files } = req
    console.log(files)
    for (let file in files) {
        lecture[file] = `${files[file][0].path.split("\\")[1]}/${files[file][0].path.split("\\")[2]}`
    }

    const createdLecture = await ContentModel.create(lecture)
    await mongoose.disconnect()
    res.status(200).json({ message: 'lecture has been created successfully', values: createdLecture })
})

// get lectures accroding to grade (g1)
const getLectures = asyncHandler(async (req, res) => {

    await mongoose.connect(DB_URI)
    const gradeId = req.user?.grade?.gradeId
    let lectures
    if (req.user.isAdmin) {
        lectures = await ContentModel.find({})

    } else if (gradeId) {
        lectures = await ContentModel.find({ gradeId: gradeId }) // by grade
    } else {
        mongoose.disconnect()
        res.status(401)
        throw new Error("Not authed")
    }

    if (lectures) {
        res.json(lectures)
        mongoose.disconnect()
    } else {
        mongoose.disconnect()
        res.status(404)
        throw new Error("No lecture found")
    }
})

// update lecture
const updateLecture = asyncHandler(async (req, res) => {
    const lecture = req.body
    const { unitId, lessonId, partId } = lecture
    let updatedLecture
    await mongoose.connect(DB_URI)
    if (partId) {
        updatedLecture = await ContentModel.updateOne({ partId: lecture.partId }, lecture)

    } else if (lessonId) {
        updatedLecture = await ContentModel.updateMany({ lessonId: lecture.lessonId }, lecture)

    } else if (unitId) {
        updatedLecture = await ContentModel.updateMany({ unitId: lecture.unitId }, lecture)
    }
    console.log(updatedLecture)
    mongoose.disconnect()
    res.json({ message: "updated successfully", values: updatedLecture })
})

// delete lecture 
const deleteLecture = asyncHandler(async (req, res) => {
    const lecture = req.body
    await mongoose.connect(DB_URI)
    await ContentModel.deleteOne({ partId: lecture.partId })
    mongoose.disconnect()
    res.json({ message: "deleted successfully" })
})
module.exports = { createLecture, getLectures, updateLecture, deleteLecture }