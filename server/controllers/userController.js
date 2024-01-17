const mongoose = require("mongoose")
const dotenv = require("dotenv")
const asyncHandler = require("express-async-handler")
const UserModel = require("../models/UserModel.js")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../middleware/generateToken.js");
const SettingsModel = require("../models/SettingsModel.js")

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
        throw new Error("something went wrong") // ("something went wrong", error) kant mktoba kda
    }
})

// get user
const getUser = asyncHandler(async (req, res, next) => {
    await mongoose.connect(DB_URI)
    const id = req.params.id
    const user = await UserModel.findOne({ userName: id }).select("-password")
    await mongoose.disconnect()
    if (user) {
        res.json(user)
    } else {
        mongoose.disconnect()
        throw new Error("no user has this user name")
    }
})

// add user
const addUser = asyncHandler(async (req, res, next) => {
    await mongoose.connect(DB_URI)
    const user = req.body
    const grade = await SettingsModel.findOne({ gradeId: user.grade })
    user.grade = grade

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
    const newUser = await UserModel.create(user)

    
    res.json({ message: "users has been added successfully", values: newUser })
    mongoose.disconnect()
})

// update user
const updateUser = asyncHandler(async (req, res, next) => {
    await mongoose.connect(DB_URI)
    const user = req.body

    if (user.password) {
        const hashedPassword = bcrypt.hashSync("369258", 10)
        user.password = hashedPassword
        const doc = await UserModel.findByIdAndUpdate(user._id, user)
        console.log(doc)
        mongoose.disconnect()
        res.json({ message: "user reset password successfully" })
        return;
    }

    if (user.message) {
        const message = user.message
        delete user.message
        const doc = await UserModel.findByIdAndUpdate(user._id, user)
        mongoose.disconnect()
        console.log("with message")
        res.status(200).json({ message, values: doc })
        return;
    }

    const doc = await UserModel.findByIdAndUpdate(user._id, user, { new: true }).select("-password")
    mongoose.disconnect()
    res.status(200).json({ message: "user updated successfully", values: doc })

})

// delete user
const deleteUser = asyncHandler(async (req, res, next) => {
    await mongoose.connect(DB_URI)
    const user = req.body
    if (user.isAdmin) {
        mongoose.disconnect()
        throw new Error("sorry, you are admin")
    }

    await UserModel.deleteOne({ userName: user.userName })
    mongoose.disconnect()
    res.status(200).json({ message: "user deleted successfully" })
})
// login
const login = asyncHandler(async (req, res, next) => {
    // await mongoose.connect(DB_URI)
    const { userName, password } = req.body
    const user = await UserModel.findOne({ userName })

    if (user) {
        const isTruePass = await bcrypt.compare(password, user.password)
        if (isTruePass) {
            const userDoc = user._doc
            const token = generateToken({ id: userDoc._id })
            delete userDoc.password
            if (userDoc.isActive) {
                res.status(200).json({ message: "logged in successfully", values: { ...userDoc, token } })
            } else {
                res.status(401)
                throw new Error("sorry!, you are not active")
            }
            // mongoose.disconnect()
        } else {
            res.status(400)
            // mongoose.disconnect()
            throw new Error("incorrect password")
        }
    } else {
        // mongoose.disconnect()
        res.status(404)
        throw new Error("user not found")
    }
})
module.exports = { getAllUsers, addUser, login, getUser, updateUser, deleteUser }