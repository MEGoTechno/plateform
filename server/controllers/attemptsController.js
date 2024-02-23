const asyncHandler = require("express-async-handler")
const checkAnswersFc = require("../tools/checkAnswersFc")
const statusTexts = require("../tools/statusTexts")
const AttemptModel = require("../models/AttemptModel")
const ExamModel = require("../models/examModel")
const getAttemptMark = require("../tools/getAttemptMark")
const UserModel = require("../models/UserModel")
const { user_roles } = require("../tools/rolesConstants")




// @desc get exam attempts
// @route GET /attempts
// @access Private
const getExamAttempts = asyncHandler(async (req, res, next) => {

    const query = req.query

    const limit = query.limit || 10000
    const page = query.page || 1
    const skip = (page - 1) * limit

    const examId = query.examId || "All"


    let findQuery = {}

    if (examId !== "All") {
        findQuery.exam = examId
    }

    const attempts = await AttemptModel.find(findQuery, { __v: false }).populate("user exam").limit(limit).skip(skip)
    const attemptsCount = await AttemptModel.countDocuments(findQuery)

    res.status(200).json({ status: statusTexts.SUCCESS, values: { attempts, count: attemptsCount } })
})


// @desc get all attempts
// @route GET /attempts/:userId
// @access public
const getUserAttempts = asyncHandler(async (req, res, next) => {


    const { userId } = req.params
    const { examId } = req.query
    const query = req.query

    const limit = query.limit || 10000
    const page = query.page || 1
    const skip = (page - 1) * limit


    let findQuery = { user: userId }

    if (examId !== "All") {
        findQuery.exam = examId
    }


    const attempt = await AttemptModel.find(findQuery).populate("exam").select("-__v").limit(limit).skip(skip)
    const attemptsCount = await AttemptModel.countDocuments(findQuery)
    
    const attemptInfo = { attempt, count: attemptsCount }
    res.status(200).json({ status: statusTexts.SUCCESS, values: attemptInfo })
})

// @desc add new attempts
// @route Post /attempts
// @access public
const addAttempt = asyncHandler(async (req, res, next) => {
    const attempt = req.body

    const exam = await ExamModel.findById(attempt.exam).select("-__v")
    const user = await UserModel.findById(attempt.user)

    const score = getAttemptMark(exam, attempt.chosenOptions)

    attempt.mark = score
    user.totalPoints += score

    await user.save()

    const createdAttempt = await AttemptModel.create(attempt)
    res.status(201).json({ status: statusTexts.SUCCESS, values: { ...createdAttempt, user }, message: "done" })
})


module.exports = { getExamAttempts, addAttempt, getUserAttempts }