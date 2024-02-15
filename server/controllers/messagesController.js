const asyncHandler = require("express-async-handler")
const MessageModel = require("../models/messageModels")
const statusTexts = require('../tools/statusTexts')
const { user_roles } = require("../tools/rolesConstants")

// @desc get messages
// @route GET /messages
// @access Public
const getMessages = asyncHandler(async (req, res, next) => {

    const user = req.user

    if (user.role !== user_roles.ADMIN) {
        const userName = req?.query?.user
        const messages = await MessageModel.find({ userName: user.userName }).populate('user', "name grade")
        return res.status(200).json({ status: statusTexts.SUCCESS, values: messages })
    }
    const messages = await MessageModel.find({}).populate('user', "name grade")
    res.status(200).json({ status: statusTexts.SUCCESS, values: messages })
})

// @desc create messages
// @route POST /messages
// @access Public
const sendMessage = asyncHandler(async (req, res, next) => {

    const { id, userName, subject, message } = req.body

    const created = new MessageModel({ user: id, userName, subject, message })
    await created.save()

    res.status(201).json({ status: statusTexts.SUCCESS, values: created })
})


// @desc update messages
// @route PATCH /messages
// @access Public
const updateMessage = asyncHandler(async (req, res, next) => {

    const { _id, userName, subject, message, answer } = req.body
    const foundMessage = await MessageModel.findById(_id)

    foundMessage.answer = answer || foundMessage.answer
    foundMessage.subject = subject || foundMessage.subject
    foundMessage.message = message || foundMessage.message

    await foundMessage.save()

    res.status(201).json({ status: statusTexts.SUCCESS, values: foundMessage })
})

// @desc update messages
// @route DELETE /messages
// @access Public
const deleteMessage = asyncHandler(async (req, res, next) => {

    const { _id } = req.body
    await MessageModel.findByIdAndDelete(_id)

    res.status(201).json({ status: statusTexts.SUCCESS, message: "deleted successfully" })
})
module.exports = { getMessages, sendMessage, updateMessage, deleteMessage }