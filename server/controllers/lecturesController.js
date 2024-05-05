const asyncHandler = require("express-async-handler")
const LectureModel = require("../models/LectureModel")
const addToCloud = require("../middleware/cloudinary")
const statusTexts = require('../tools/statusTexts')
const { user_roles } = require("../tools/rolesConstants")


// @desc get all lectures
// @route GET /lectures
// @access public
const getLectures = asyncHandler(async (req, res) => {


    const gradeId = req.user?.grade

    let lectures

    if (req?.user?.role !== user_roles.STUDENT) {
        lectures = await LectureModel.find({}) //populate ==> grade

    } else if (gradeId) {
        lectures = await LectureModel.find({ grade: gradeId }) // by grade
    } else {
        res.status(401)
        throw new Error("Not authed")
    }

    if (lectures) {
        res.status(200).json({ status: statusTexts.SUCCESS, values: lectures })
    } else {
        res.status(404)
        throw new Error("No lecture found")
    }
})

// create lecture
const createLecture = asyncHandler(async (req, res) => {

    const lecture = req.body

    const { files } = req
    let results = {}

    for (let file in files) {
        const result = await addToCloud(files[file][0].path, {
            folder: "admin",
            resource_type: "auto"
        })

        if (result) {
            const { original_filename, resource_type, secure_url, url, format, bytes } = result
            results[file] = { original_filename, resource_type, secure_url, url, format, size: bytes }
        }
    }

    //add results
    const modifiedLecture = { ...lecture, ...results }
    const createdLecture = await LectureModel.create(modifiedLecture)

    res.status(200).json({ message: 'lecture has been created successfully', values: createdLecture })
})



// update lecture
const updateLecture = asyncHandler(async (req, res) => {
    const lecture = req.body
    const { unitId, lessonId, partId } = lecture
    let updatedLecture

    if (partId) {

        const { files } = req
        let results = {}
        for (let file in files) {
            const result = await addToCloud(files[file][0].path, {
                folder: "admin",
                resource_type: "auto"
            })
            // console.log(result)
            if (result) {
                const { original_filename, resource_type, secure_url, url, format, bytes } = result
                results[file] = { original_filename, resource_type, secure_url, url, format, size: bytes }
            }

        }
        //add results
        let modifiedLecture = lecture
        
        if (files && results) {
            modifiedLecture = { ...lecture, ...results }
        }

        updatedLecture = await LectureModel.updateOne({ partId: lecture.partId }, modifiedLecture)

    } else if (lessonId) {
        updatedLecture = await LectureModel.updateMany({ lessonId: lecture.lessonId }, lecture)

    } else if (unitId) {
        updatedLecture = await LectureModel.updateMany({ unitId: lecture.unitId }, lecture)
    }
    res.json({ message: "updated successfully", values: updatedLecture })
})

// delete lecture 
const deleteLecture = asyncHandler(async (req, res) => {
    const lecture = req.body

    await LectureModel.deleteOne({ partId: lecture.partId })
    res.json({ message: "deleted successfully" })
})

module.exports = { createLecture, getLectures, updateLecture, deleteLecture }
