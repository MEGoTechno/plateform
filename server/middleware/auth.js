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
        await mongoose.connect(DB_URI)

        const user = await UserModel.findById(userId)
        if (user) {
            req.user = user
        } else {
            res.status(401).json({isUser: false})
            mongoose.disconnect()
            throw new Error("not authed or data is wrong")
        }
        next()
    } else {
        res.status(401).json({isUser: false})
        mongoose.disconnect()
        throw new Error("not authed")
    }
})

const checkUser = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization) {
        const { userId } = jwt.verify(req.headers.authorization.split(" ")[1], SECRETJWT)
        await mongoose.connect(DB_URI)

        const user = await UserModel.findById(userId)
        if (user) {
            req.user = user
            res.json({ message: "is authed" })
        } else {
            res.status(404)
            mongoose.disconnect()
            throw new Error("not authed or data is wrong")
        }
    } else {
        res.status(404)
        mongoose.disconnect()
        throw new Error("not authed")
    }
})

const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization) {
        const { userId } = jwt.verify(req.headers.authorization.split(" ")[1], SECRETJWT)
        await mongoose.connect(DB_URI)

        const user = await UserModel.findById(userId)
        if (user && user.isAdmin) {
            req.user = user
        } else {
            res.status(401)
            mongoose.disconnect()
            throw new Error("not authed")
        }
        next()
    } else {
        res.status(401)
        mongoose.disconnect()
        throw new Error("not authed")
    }
})

module.exports = { isUser, isAdmin }