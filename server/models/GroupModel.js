const mongoose = require("mongoose")
const GradeModel = require("./GradeModel")

const groupSchema = new mongoose.Schema({
    grade: { type: mongoose.Schema.Types.ObjectId, ref: GradeModel },
    groupName: { type: Object, required: true },
    days: [{
        time: { type: String, required: true },
        dayIndex: { type: Number, required: true }
    }]

}, { timestamps: true })

const GroupModel = mongoose.model("group", groupSchema)
module.exports = GroupModel