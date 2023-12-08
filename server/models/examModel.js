const mongoose = require("mongoose")

const examSchema = mongoose.Schema({
    gradeId: { type: String }, // string g + num
    unitId: { type: String }, // grade + unit
    lessonId: { type: String }, // grade + unit + lesson
    partId: { type: String }, // grade + unit + lesson + part
    gradeName: { type: String },
    unitName: { type: String },
    lessonName: { type: String },
    partName: { type: String }, // == exam name
    description: { type: String },
    degree: { type: String },
    time: {type: String, default: "30"},
    questions: [{
        id: { type: String }, // grade + unit + lesson + part + question
        title: { type: String },
        hints: { type: String },
        rtOptionId: { type: String },
        points: { type: String },
        options: [{
            id: { type: String }, // grade + unit + lesson + part + question + option
            title: { type: String },
        }],
    },]
}, {
    timestamps: true
})


const ExamModel = mongoose.model("exam", examSchema)
module.exports = ExamModel