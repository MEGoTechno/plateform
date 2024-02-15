const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const UserModel = require("../models/UserModel.js")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../middleware/generateToken.js");
const SettingsModel = require("../models/GradeModel.js")
const statusTexts = require("../tools/statusTexts.js");
const createError = require("../tools/createError.js");
const msgTexts = require("../tools/msgTexts.js")

const addToCloud = require("../middleware/cloudinary")

// @desc get all user
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res, next) => {

    const query = req.query

    const limit = query.limit || 200
    const page = query.page || 1
    const skip = (page - 1) * limit

    const gradeId = query.gradeId || "All"
    const role = query.role || "All"

    let findQuery = {}

    if (gradeId !== "All") {
        findQuery.grade = gradeId
    }

    if (role !== "All") {
        findQuery.role = role
    }

    const users = await UserModel.find(findQuery, { password: false, __v: false }).populate("group grade").limit(limit).skip(skip)
    let usersLength = 0

    if (findQuery) {

        usersLength = await UserModel.countDocuments(findQuery)
    } else {
        usersLength = await UserModel.estimatedDocumentCount()
    }
    console.log(usersLength)
    if (users) {
        res.status(200).json({ status: statusTexts.SUCCESS, values: { users, count: usersLength } })
    } else {
        const error = createError(msgTexts.NO_USERS, 404, statusTexts.FAILED)
        next(error)
    }
})

// @desc get one user
// @route GET /users/:id
// @access Private
const getUser = asyncHandler(async (req, res, next) => {

    const userName = req.params.userName

    if (userName) {

        const user = await UserModel.find({ userName }, { password: false, __v: false })
        res.status(200).json({ status: statusTexts.SUCCESS, values: user })

    } else {
        const error = createError(msgTexts.NOTFOUND_USERNAME, 404, statusTexts.FAILED)
        next(error)
    }

})

// @desc create user
// @route POST /users
// @access Private
const createUser = asyncHandler(async (req, res, next) => {

    const user = req.body
    const { grade, group, name, userName, password, email, phone, familyPhone } = user

    if (user.userName) {
        const foundUser = await UserModel.findOne({ userName: user.userName })
        // for exsiting user ----
        if (foundUser) {
            const error = createError(msgTexts.FOUND_USERNAME, 400, statusTexts.FAILED)
            next(error)
        }
    } else {
        const error = createError(msgTexts.BAD_DATA, 400, statusTexts.FAILED)
        next(error)
    }

    // ------
    const hashedPassword = bcrypt.hashSync(password, 10)

    const createdUser = await UserModel.create({
        grade, group, name, userName, password: hashedPassword, email, phone, familyPhone
    })

    res.status(201).json({ status: statusTexts.SUCCESS, values: createdUser, message: "user has been added successfully" })
})

// @desc update user // user profile 
// @route POST /users
// @access Public   ==> admin/user/subAdmin
const updateUser = asyncHandler(async (req, res, next) => {

    //avater
    const { _id, name, email, password, phone, familyPhone, isActive, role, paymentId } = req.body
    const user = await UserModel.findById(_id).select("-password -__v")

    user.name = name || user.name
    user.email = email || user.email
    user.phone = phone || user.phone
    user.familyPhone = familyPhone || user.familyPhone
    user.isActive = typeof isActive === "boolean" ? isActive : user.isActive
    user.role = role || user.role
    console.log(user.payments.includes(paymentId))

    user.payments.includes(paymentId) ?
        user.payments = user.payments.filter(payment => paymentId !== payment) :
        user.payments = [...user.payments, paymentId]

    if (password === 'reset') {
        const hashedPassword = bcrypt.hashSync(user.userName, 10)
        user.password = hashedPassword

    } else if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10)
        user.password = hashedPassword
    }

    await user.save()


    return res.status(200).json({ status: statusTexts.SUCCESS, values: user, message: "User edited successfully" })

})

// @desc update user // user profile 
// @route PUT /users
// @access Public   ==> admin/user/subAdmin
const updateUserProfile = asyncHandler(async (req, res, next) => {

    const { _id, userName, name, email, password, phone, familyPhone } = req.body
    const user = await UserModel.findById(_id).populate("grade", "-__v").populate("group", "-__v").select("-password -__v")


    const { file } = req
    let avatar = {}
    console.log(file)

    if (file) {
        const result = await addToCloud(file.path, {
            folder: userName,
            resource_type: "auto"
        })

        if (result) {
            const { original_filename, resource_type, secure_url, url, format, bytes } = result
            avatar = { original_filename, resource_type, secure_url, url, format, size: bytes }
        }
    }

    //avater

    user.name = name || user.name
    user.email = email || user.email
    user.phone = phone || user.phone
    user.familyPhone = familyPhone || user.familyPhone

    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10)
        user.password = hashedPassword
    }

    if (file && avatar) {
        user.avatar = avatar || user.avatar
    }

    await user.save()


    return res.status(200).json({ status: statusTexts.SUCCESS, values: user, message: "User edited successfully" })

})

// @desc update user // user profile 
// @route POST /users
// @access Private   ==> admin
const deleteUser = asyncHandler(async (req, res, next) => {

    const user = req.body

    if (user.isAdmin) {
        const error = createError("admin can`t be deleted", 400, statusTexts.FAILED)
        next(error)
    }

    await UserModel.findByIdAndDelete(user._id)
    res.status(200).json({ status: statusTexts.SUCCESS, message: "User delete successfuly" })
})


// @desc user login
// @route POST /login
// @access Public   
const login = asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body
    const user = await UserModel.findOne({ userName }).populate("grade", "-__v").populate("group", "-__v").select("-__v")

    if (user) {
        const isTruePass = await bcrypt.compare(password, user.password)
        if (isTruePass) {
            const userDoc = user._doc
            const token = generateToken({ id: userDoc._id })
            delete userDoc.password

            if (userDoc.isActive) {
                res.status(200).json({ status: statusTexts.SUCCESS, values: { ...userDoc, token }, message: "logged in successfully" })
            } else {
                const error = createError("sorry, you are not active ", 401, statusTexts.FAILED)
                next(error)
            }
        } else {
            const error = createError("incorrect password ", 400, statusTexts.FAILED)
            next(error)
        }

    } else {
        const error = createError("user not found ", 404, statusTexts.FAILED)
        next(error)
    }
})

module.exports = { getAllUsers, createUser, updateUserProfile, login, getUser, updateUser, deleteUser }