const asyncHandler = require("express-async-handler")
const statusTexts = require("../tools/statusTexts")
const createError = require("../tools/createError")
const msgTexts = require("../tools/msgTexts.js")
const PaymentModel = require("../models/PaymentModel.js")
const UserModel = require("../models/UserModel.js")
const { user_roles } = require("../tools/rolesConstants.js")

// @desc get all payments
// @route GET /payments
// @access public
const getPayments = asyncHandler(async (req, res) => {

    const payments = await PaymentModel.find({}).select("-__v")
    res.status(200).json({ status: statusTexts.SUCCESS, values: payments })

})

// @desc get payment by grade
// @route GET /payments/:gradeId
// @access Private
const getOnePayment = asyncHandler(async (req, res) => {
    const gradeId = req.params.id

    const payment = await PaymentModel.find({ grade: gradeId }).populate("grade", "-__v").select("-__v")
    res.status(200).json({ status: statusTexts.SUCCESS, values: payment })
})

// @desc create new payment
// @route POST /payment
// @access Private
const createPayment = asyncHandler(async (req, res) => {

    const { paymentName, grade, price } = req.body

    const payment = await PaymentModel.create({ paymentName, grade, price })
    res.status(201).json({ status: statusTexts.SUCCESS, values: payment, message: `${paymentName} has been added successfully` })
})

// @desc update
// @route POST /payment
// @access Private
const updatePayment = asyncHandler(async (req, res) => {

    const modifiedPayment = req.body

    if (modifiedPayment) {
        const payment = await PaymentModel.findById(modifiedPayment._id)

        payment.paymentName = modifiedPayment.paymentName || payment.paymentName
        payment.grade = modifiedPayment.grade || payment.grade
        payment.price = modifiedPayment.price || payment.price

        await payment.save()
    } else {
        const error = createError("connection lost in payment", 404, statusTexts.FAILED)
        next(error)
    }

    res.status(200).json({ status: statusTexts.SUCCESS, message: `${modifiedPayment.paymentName} has been edited successfully` })
})

// @desc update
// @route POST /payment
// @access Private
const checkUsersPayment = asyncHandler(async (req, res) => {

    const { gradeId, isActive, payment } = req.body
    console.log(gradeId, isActive, payment)
    await UserModel.updateMany({ grade: gradeId, role: user_roles.STUDENT, payments: { $nin: [payment] } }, { isActive })
    res.status(200).json({ status: statusTexts.SUCCESS, message: `user inactivated successfully` })
})


// @desc delete payment
// @route DELETE /payment
// @access Private
const deletePayment = asyncHandler(async (req, res, next) => {

    const payment = req.body

    // const foundUser = await UserModel.find({ payments: payment._id })
    const foundUser = await UserModel.find({ payments: { $in: [payment._id] } })

    if (foundUser?.length > 0) {
        const error = createError("can`t be deleted ;there are users has payed", 400, statusTexts.FAILED)
        next(error)
    } else {
        await PaymentModel.findByIdAndDelete(payment._id)
        res.status(200).json({ status: statusTexts.SUCCESS, message: "deleted successfully" })
    }

})
module.exports = { getPayments, createPayment, checkUsersPayment, deletePayment, getOnePayment }