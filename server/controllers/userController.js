const mongoose = require("mongoose")
const dotenv = require("dotenv")
const asyncHandler = require("express-async-handler")
const UserModel = require("../models/UserModel.js")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../middleware/generateToken.js");

// config
dotenv.config()
const DB_URI = process.env.MONGO_URI

// get all users 
// add new user
// delete user
// ubpdate user profile and get specified user


// get users
const getAllUsers = asyncHandler(async (req, res, next) => {
    await mongoose.connect(DB_URI)
    const users = await UserModel.find({}).select("-password")
    await mongoose.disconnect()
    if (users) {

        res.json(users)
    } else {
        throw new Error("something went wrong", error)
    }
})

// get user
const getUser = asyncHandler(async (req, res, next) => {
    await mongoose.connect(DB_URI)
    const user = await UserModel.findById(req.body.id).select("-password")
    await mongoose.disconnect()
    if (user) {

        res.json(user)
    } else {
        throw new Error("something went wrong", error)
    }
})

// add user
const addUser = asyncHandler(async (req, res, next) => {
    await mongoose.connect(DB_URI)
    const user = req.body

    if (user.userName) {
        const foundUser = await UserModel.findOne({ userName: user.userName })
        // for exsiting user ----
        if (foundUser) {
            res.status(400)
            mongoose.disconnect()
            throw new Error("there is a user has same userName")
        }
    } else {
        res.status(400)
        mongoose.disconnect()
        throw new Error("user data is missed")
    }

    // ------
    const hashedPassword = bcrypt.hashSync(user.password, 10)
    user.password = hashedPassword
    await UserModel.create(user)
    res.json({ message: "users has been added successfully" })
    mongoose.disconnect()
})

// login
const login = asyncHandler(async (req, res, next) => {
    await mongoose.connect(DB_URI)
    const { userName, password } = req.body
    const user = await UserModel.findOne({ userName })

    if (user) {
        const isTruePass = await bcrypt.compare(password, user.password)
        if (isTruePass) {
            const userDoc = user._doc
            const token = generateToken({ id: userDoc._id })
            delete userDoc.password

            res.json({ ...userDoc, token })
            mongoose.disconnect()
        } else {
            res.status()
            mongoose.disconnect()
            throw new Error("incorrect password")
        }
    } else {401
        mongoose.disconnect()
        res.status(404)
        throw new Error("user not found")
    }
})
module.exports = { getAllUsers, addUser, login , getUser}