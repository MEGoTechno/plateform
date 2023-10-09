const mongoose = require("mongoose")

const examSchema = mongoose.Schema({
    id: { type: String }, // grade + unit + lesson + part
    gradeId: { type: String }, // string g + num
    unitId: { type: String }, // grade + unit
    lessonId: { type: String }, // grade + unit + lesson
    partId: { type: String }, // grade + unit + lesson + part
    grade: { type: String },
    unitName: { type: String },
    lessonName: { type: String },
    partName: { type: String }, // == exam name
    description: { type: String },
    degree: { type: String },
    questions: [{
        id: { type: String }, // grade + unit + lesson + part + question
        title: { type: String },
        hints: { type: String },
        rtOption: { type: String },
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