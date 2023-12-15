const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const ExamModel = require("../models/examModel")
const dotenv = require("dotenv")

// config
dotenv.config()
const DB_URI = process.env.MONGO_URI

// fcs

// get exams accroding to grade (g1)
const getExams = asyncHandler(async (req, res) => {

    await mongoose.connect(DB_URI)
    const gradeId = req.user?.grade?.gradeId
    let exams
    if (req.user.isAdmin) {
        exams = await ExamModel.find({})

    } else if (gradeId) {
        exams = await ExamModel.find({ gradeId: gradeId }) // by gradeId
    } else {
        mongoose.disconnect()
        res.status(401)
        throw new Error("Not authed")
    }

    if (exams) {
        res.json(exams)
        mongoose.disconnect()
    } else {
        mongoose.disconnect()
        res.status(404)
        throw new Error("No exams found")
    }
})

// create exam
const createExam = asyncHandler(async (req, res) => {
    await mongoose.connect(DB_URI)
    const exam = req.body
    const foundExam = await ExamModel.find({ partId: exam.partId })
    if (foundExam[0]) {
        mongoose.disconnect()
        res.status(400)
        throw new Error("there is exam has same id")
    } else {
        const createdExam = await ExamModel.create(exam)
        await mongoose.disconnect()
        res.status(200).json({ message: "exam has been created successfully", value: createdExam })
    }
})

// update exam
const updateExam = asyncHandler(async (req, res) => {
    const exam = req.body
    await mongoose.connect(DB_URI)
    await ExamModel.updateOne({ partId: exam.id }, exam)
    mongoose.disconnect()
    res.json({ message: "done" })
})

// delete exam 
const deleteExam = asyncHandler(async (req, res) => {
    const exam = req.body
    await mongoose.connect(DB_URI)
    await ExamModel.deleteOne({ partId: exam.partId })
    mongoose.disconnect()
    res.status(200).json({ message: "exam has been deleted" })
})
module.exports = { getExams, createExam, updateExam, deleteExam }