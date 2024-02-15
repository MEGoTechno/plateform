const asyncHandler = require("express-async-handler")
const GradeModel = require("../models/GradeModel")
const statusTexts = require("../tools/statusTexts")


// @desc getGrades
// @route GET /grades
// @access Private
const getGrades = asyncHandler(async (req, res) => {

    const grades = await GradeModel.find({}).select("-__v")
    res.status(200).json({ status: statusTexts.SUCCESS, values: grades })
})

// @desc create
// @route POST /grades
// @access Private
const createGrade = asyncHandler(async (req, res) => {

    const grade = req.body
    const createdGrade = await GradeModel.create(grade)
    res.json({ status: statusTexts.SUCCESS, values: createdGrade, message: `${createdGrade.gradeName} has been created successfully` })

})

// @desc update
// @route PATCH /grades
// @access Private
const updateGrade = asyncHandler(async (req, res) => {

    const grade = req.body

    await GradeModel.findByIdAndUpdate(grade._id, grade)
    res.status(200).json({ message: `${grade.gradeName} has been updated successfully`, status: statusTexts.SUCCESS })

})

// @desc delete
// @route DELETE /grades/:id
// @access Private
const deleteGrade = asyncHandler(async (req, res) => {

    const grade = req.body
    await GradeModel.findByIdAndDelete(grade._id)
    res.status(200).json({ message: `deleted successfully`, status: statusTexts.SUCCESS })

})

module.exports = { getGrades, createGrade, updateGrade, deleteGrade }