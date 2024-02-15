const asyncHandler = require("express-async-handler")
const ExamModel = require("../models/examModel")
const statusTexts = require("../tools/statusTexts")
const msgTexts = require("../tools/msgTexts")
const createError = require("../tools/createError")
const { user_roles } = require("../tools/rolesConstants")
// fcs

// @desc get exams
// @route GET /exams
// @access Public  grade_id
const getExams = asyncHandler(async (req, res, next) => {

    const gradeId = req.user?.grade
    let exams

    if (req?.user?.role !== user_roles.STUDENT) {
        exams = await ExamModel.find({}).select("-__v") //-questions.rtOptionId

    } else if (gradeId) {
        exams = await ExamModel.find({ grade: gradeId }).select("-__v -questions.rtOptionId") // by gradeId
    } else {
        const error = createError(msgTexts.NOT_AUTHED, 401, statusTexts.FAILED)
        return next(error)
    }

    if (exams) {
        res.status(200).json({ status: statusTexts.SUCCESS, values: exams })
    } else {
        const error = createError(msgTexts.NO_EXAMS, 404, statusTexts.FAILED)
        next(error)
    }
})

// @desc get one exam
// @route GET /exams/:id
// @access Public  
const getOneExam = asyncHandler(async (req, res, next) => {

    const id = req.params.id

    if (id) {

        const exam = await ExamModel.findById(id).select("-__v -questions.rtOptionId")
        return res.status(200).json({ status: statusTexts.SUCCESS, values: exam })

    } else {
        const error = createError("invalid data", 404, statusTexts.FAILED)
        next(error)
    }

})

// @desc create exam
// @route POST /exams
// @access Private 
const createExam = asyncHandler(async (req, res, next) => {

    const exam = req.body
    const { grade, unitId, unitName, lessonId, lessonName, partId, partName, description, time, questions,
        isActive, attemptNums, dateStart, dateEnd, isShowAnswers } = exam //total

    const timeInSec = time * 60

    const createdExam = await ExamModel.create({
        time: timeInSec, grade, unitId, unitName, lessonId, lessonName, partId, partName, description, questions,
        isActive, attemptNums, dateStart, dateEnd, isShowAnswers
    })
    res.status(201).json({ status: statusTexts.SUCCESS, values: createdExam, message: msgTexts.CREATED_EXAM })
})

// @desc update exam
// @route Patch /exams
// @access Private 
const updateExam = asyncHandler(async (req, res, next) => {
    const exam = req.body

    if (exam.time) {
        exam.time = exam.time * 60
    }

    const { unitId, lessonId, partId } = exam

    if (partId) { // for editing only exam
        await ExamModel.updateOne({ partId }, exam)

    } else if (lessonId) {
        await ExamModel.updateMany({ lessonId }, exam)
    } else if (unitId) {
        await ExamModel.updateMany({ unitId }, exam)
    }
    res.status(200).json({ status: statusTexts.SUCCESS, values: null, message: msgTexts.UPDATED_EXAM })
})

// @desc delete exam
// @route DELETE /exams
// @access Private 
const deleteExam = asyncHandler(async (req, res) => {
    const exam = req.body

    await ExamModel.deleteOne({ partId: exam.partId })

    res.status(200).json({ status: statusTexts.SUCCESS, values: null, message: msgTexts.DELETED_EXAM })
})

module.exports = { getExams, getOneExam, createExam, updateExam, deleteExam }