const mongoose = require("mongoose")

const contentSchema = mongoose.Schema({
    partId: { type: String }, // grade + unit + lesson + part
    gradeId: { type: String }, // number
    gradeName: { type: String },
    unitId: { type: String }, // grade + unit
    unitName: { type: String },
    lessonId: { type: String }, // grade + unit + lesson
    lessonName: { type: String },
    partName: { type: String },
    description: { type: String },
    video: { type: String },
    thumbnail: { type: String },
}, {
    timestamps: true

})

const ContentModel = mongoose.model("content", contentSchema)

module.exports = ContentModel