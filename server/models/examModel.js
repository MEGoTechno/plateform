const mongoose = require("mongoose")
const GradeModel = require("./GradeModel")

const examSchema = new mongoose.Schema({
    grade: { type: mongoose.Schema.Types.ObjectId, ref: GradeModel }, 
    unitId: { type: String }, 
    unitName: { type: String },
    lessonId: { type: String }, 
    lessonName: { type: String },
    partId: { type: String }, 
    partName: { type: String }, // == exam name
    description: { type: String },
    total: { type: Number },
    time: {type: Number, default: (15 * 60)},
    dateStart: {type: Date},
    dateEnd: {type: Date},
    isActive: {type: Boolean, default: true},
    isShowAnswers: {type: Boolean, default: true},
    attemptsNums: {type: Number, default: 1},
    questions: [{
        title: { type: String },
        hints: { type: String },
        rtOptionId: { type: String },
        points: { type: Number, default: 1 },
        options: [{
            id: { type: String }, 
            title: { type: String },
        }],
    },]
}, {
    timestamps: true
})


const ExamModel = mongoose.model("exam", examSchema)
module.exports = ExamModel