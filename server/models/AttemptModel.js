const mongoose = require("mongoose")
const UserModel = require("./UserModel")
const ExamModel = require("./examModel")

const attemptSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: ExamModel },
    mark: { type: Number },
    tokenTime: { type: Number },
    chosenOptions: [{
        questionId: { type: String }, // grade + unit + lesson + part + question
        chosenOptionId: { type: String }, // grade + unit + lesson + part + question + option
    },]
}, {
    timestamps: true
})


const AttemptModel = mongoose.model("attempt", attemptSchema)
module.exports = AttemptModel