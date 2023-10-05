const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const ExamModel = require("../models/examModel")
const dotenv = require("dotenv")

// config
dotenv.config()
const DB_URI = process.env.MONGO_URI

// fc
const getExams = asyncHandler(async (req, res)=> {
    await mongoose.connect(DB_URI)
    let exams
    if (req.user.isAdmin) {
        const grade = req.user.grade
        console.log(grade)
        exams = await ExamModel.find({gradeId: grade, units: {unitId: "g1u1 "}})
    } else if (req.user.grade) {

        const grade = req.user.grade
        console.log(grade)
        exams = await ExamModel.find({ gradeId: grade }) // by grade
    } else {
        mongoose.disconnect()
        res.status(400)
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

// const checkExam = asyncHandler(async(req, res)=> {
//     await mongoose.connect(DB_URI)
// })
module.exports = { getExams }