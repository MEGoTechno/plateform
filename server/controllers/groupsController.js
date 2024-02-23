const asyncHandler = require("express-async-handler")
const GroupModel = require("../models/GroupModel")
const statusTexts = require("../tools/statusTexts")
const createError = require("../tools/createError")
const msgTexts = require("../tools/msgTexts.js")
const UserModel = require("../models/UserModel.js")
const { user_roles } = require("../tools/rolesConstants.js")

// @desc getGroups
// @route GET /groups
// @access Private
const getGroups = asyncHandler(async (req, res) => {

    const groups = await GroupModel.find({}).select("-__v") //2

    const clonedGroups = JSON.parse(JSON.stringify(groups))


    for (let i = 0; i < clonedGroups.length; i++) {
        const nums = await UserModel.countDocuments({ group: clonedGroups[i]._id, role: user_roles.STUDENT })
        clonedGroups[i].stdNumbers = nums
    }

    res.status(200).json({ status: statusTexts.SUCCESS, values: clonedGroups })
})

// @desc create
// @route POST /groups
// @access Private
const createGroup = asyncHandler(async (req, res) => {

    const newGroup = req.body
    const createdGroup = await GroupModel.create(newGroup)
    res.status(201).json({ status: statusTexts.SUCCESS, values: createdGroup, message: `${createdGroup.groupName} has been added successfully` })
})

// @desc update
// @route POST /groups
// @access Private
const updateGroup = asyncHandler(async (req, res) => {

    const modifiedGroup = req.body

    if (modifiedGroup) {
        const group = await GroupModel.findById(modifiedGroup._id)

        group.groupName = modifiedGroup.groupName || group.groupName
        group.days = modifiedGroup.days || group.days

        await group.save()
    } else {
        const error = createError(msgTexts.NOTFOUND_USERNAME, 404, statusTexts.FAILED)
        next(error)
    }

    res.status(200).json({ status: statusTexts.SUCCESS, message: `${modifiedGroup.groupName} has been edited successfully` })
})

// @desc delete group
// @route DELETE /groups
// @access Private
const deleteGroup = asyncHandler(async (req, res, next) => {

    const group = req.body
    const foundUser = await UserModel.findOne({ group: group._id, role: user_roles.STUDENT })

    if (foundUser) {
        return next(new Error("there is user in this group"))
    }

    await GroupModel.findByIdAndDelete(group._id)
    res.status(200).json({ status: statusTexts.SUCCESS, message: group.groupName + "  deleted successfully" })
})
module.exports = { getGroups, createGroup, updateGroup, deleteGroup }