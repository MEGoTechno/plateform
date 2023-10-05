const mongoose = require("mongoose")

const examSchema = mongoose.Schema({
    gradeId: { type: String }, // grade + unit + lesson + part
    gradeName: { type: String },
    units: [{
        unitId: { type: String }, // grade + unit
        unitName: { type: String },
        lessons: [{
            lessonId: { type: String }, // grade + unit + lesson
            lessonName: { type: String },
            parts: [{
                partId: { type: String }, // grade + unit + lesson + part
                partName: { type: String },
                description: { type: String },
                questions: [{
                    questionId: { type: String }, // grade + unit + lesson + part + question
                    questionTitle: { type: String },
                    hints: { type: String },
                    rtOptionId: { type: String },
                    options: [{
                        optionId: { type: String }, // grade + unit + lesson + part + question + option
                        points: { type: Number, default: 1 },
                        OptionTitle: { type: String },
                    }]
                }]
            }]
        }]
    }],
}, {
    timestamps: true
})



const ExamModel = mongoose.model("exam", examSchema)
module.exports = ExamModel