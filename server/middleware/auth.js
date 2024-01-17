const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const { default: mongoose, mongo } = require('mongoose');
const UserModel = require('../models/UserModel');
const asyncHandler = require('express-async-handler')

// config
dotenv.config()
const SECRETJWT = process.env.SECRETJWT
const DB_URI = process.env.MONGO_URI


const isUser = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization) {
        const { userId } = jwt.verify(req.headers.authorization.split(" ")[1], SECRETJWT)
        // await mongoose.connect(DB_URI)

        const user = await UserModel.findById(userId)
        if (user) {
            req.user = user
        } else {
            // mongoose.disconnect()
            res.status(401)
            throw new Error("Not authed")
        }
        next()
    } else {
        // mongoose.disconnect()
        res.status(401)
        throw new Error("Not authed")
    }
})

const checkUser = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization) {
        const { userId } = jwt.verify(req.headers.authorization.split(" ")[1], SECRETJWT)
        // await mongoose.connect(DB_URI)

        const user = await UserModel.findById(userId)
        if (user) {
            req.user = user
            res.json({ message: "is authed" })
        } else {
            res.status(404)
            // mongoose.disconnect()
            throw new Error("not authed or data is wrong")
        }
    } else {
        res.status(404)
        // mongoose.disconnect()
        throw new Error("not authed")
    }
})

const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization) {
        const { userId } = jwt.verify(req.headers.authorization.split(" ")[1], SECRETJWT)
        // await mongoose.connect(DB_URI)

        const admin = await UserModel.findById(userId)
        if (admin && admin.isAdmin) {
            req.admin = admin
        } else {
            res.status(401)
            // mongoose.disconnect()
            throw new Error("Not authed ,")
        }
        next()
    } else {
        res.status(401)
        // mongoose.disconnect()
        throw new Error("not authed")
    }
})

const isAccessed = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization) {
        const { userId } = jwt.verify(req.headers.authorization.split(" ")[1], SECRETJWT)
        // await mongoose.connect(DB_URI)

        const user = await UserModel.findById(userId)
        if (user) {
            if (user.role === 'subAdmin' || user.role === "admin") {
                req.user = user
            } else {
                res.status(401)
                // mongoose.disconnect()
                throw new Error("you do not have permission")
            }
        } else {
            res.status(401)
            // mongoose.disconnect()
            throw new Error("404, not found user")
        }
        next()
    } else {
        res.status(401)
        // mongoose.disconnect()
        throw new Error("Not authed")
    }
})
module.exports = { isUser, isAdmin, isAccessed }