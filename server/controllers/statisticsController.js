const asyncHandler = require("express-async-handler")
const UserModel = require("../models/UserModel.js")
const { getLargest, getSmallest, getAverage } = require("../tools/pointsCalc.js")
const { user_roles } = require("../tools/rolesConstants.js")
const statusTexts = require("../tools/statusTexts.js");
const AttemptModel = require("../models/AttemptModel.js");
const { getUnique } = require("../tools/arrayFc.js");
const GroupModel = require("../models/GroupModel.js");
const ExamModel = require("../models/examModel.js");


// @desc get users largest, average, smallest
// @route GET /statistics/users
// @access Private
const getUsersStatistics = asyncHandler(async (req, res, next) => {
    const grade = req.query.grade

    const users = await UserModel.find({ grade, role: user_roles.STUDENT }).select("totalPoints")

    const largest = getLargest(users)
    const smallest = getSmallest(users)
    const average = getAverage(users)

    res.status(200).json({ status: statusTexts.SUCCESS, values: { largest, smallest, average } })
})

// @desc get exam examId,grade, filterGt
// @route GET /statistics/exam
// @access Private
const getExamStatistics = asyncHandler(async (req, res, next) => {

    const query = req.query

    const examId = query.examId
    const grade = query.grade

    const filterGt = query.filterGt

    const usersCount = await UserModel.countDocuments({ grade })
    const users = await UserModel.find({ grade })

    const usersAnswered = await AttemptModel.find({ exam: examId })
    const filterUsers = getUnique(usersAnswered, "user")

    const notAnsweredUsers = users.filter(user => {

        const isTheere = filterUsers.filter(attempt => attempt.user.toString() === user._id.toString())

        if (isTheere.length > 0) {
            return
        } else {
            return user
        }
    })

    const answeredCount = filterUsers.length
    const notAnsweredCount = usersCount - answeredCount


    const graterThan = await AttemptModel.countDocuments({ exam: examId, mark: { $gt: filterGt } })


    res.status(200).json({ status: statusTexts.SUCCESS, values: { answeredCount, notAnsweredCount, graterThan, notAnsweredUsers } })
})

const getHomeStatistics = asyncHandler(async (req, res, next) => {

    const usersCount = await UserModel.estimatedDocumentCount()
    const groupsCount = await GroupModel.estimatedDocumentCount()

    const examsCount = await ExamModel.estimatedDocumentCount()

    res.status(200).json({ status: statusTexts.SUCCESS, values: { usersCount, groupsCount, examsCount } })
})
module.exports = { getHomeStatistics, getUsersStatistics, getExamStatistics }