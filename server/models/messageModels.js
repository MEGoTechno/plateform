const mongoose = require("mongoose")
const UserModel = require("./UserModel")

const messageSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    message: { type: String, required: true },
    subject: { type: String, required: true },
    answer: { type: String, default: "not" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: UserModel }
}, {
    timestamps: true
})

const MessageModel = mongoose.model("Message", messageSchema)

module.exports = MessageModel