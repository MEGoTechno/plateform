const mongoose = require('mongoose')
const GradeModel = require('./GradeModel')

const paymentSchema = new mongoose.Schema({
    paymentName: { type: String, required: true },
    grade: { type: mongoose.Schema.Types.ObjectId, ref: GradeModel, required: true },
    price: { type: Number },
})

const PaymentModel = mongoose.model("payment", paymentSchema)

module.exports = PaymentModel