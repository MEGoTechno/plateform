const asyncHandler = require("express-async-handler")
const checkAnswersFc = require("../tools/checkAnswersFc")
const statusTexts = require("../tools/statusTexts")
const AttemptModel = require("../models/AttemptModel")
const ExamModel = require("../models/examModel")

// @desc get all attempts
// @route GET /attempts
// @access public
const getUserAttempts = asyncHandler(async (req, res, next) => {
    const { userId } = req.params
    const { examId } = req.query

    const attempt = await AttemptModel.find({ user: userId, exam: examId }).populate("exam").select("-__v")

    res.status(200).json({ status: statusTexts.SUCCESS, values: attempt })
})

// @desc add new attempts
// @route Post /attempts
// @access public
const addAttempt = asyncHandler(async (req, res, next) => {
    const attempt = req.body

    const createdAttempt = await AttemptModel.create(attempt)

    const exam = await ExamModel.findById(createdAttempt.exam).select("-__v")

    // if (exam.isShowAnswers) {
    //     res.status(201).json({ status: statusTexts.SUCCESS, values: { ...createdAttempt, exam }, message: "done" })
    // } else {
    //     res.status(201).json({ status: statusTexts.SUCCESS, values: { isShowAnswers: false }, message: "done" })
    // }

    res.status(201).json({ status: statusTexts.SUCCESS, values: { ...createdAttempt, exam }, message: "done" })
})


module.exports = { addAttempt, getUserAttempts }