const mongoose = require("mongoose")

const contentSchema = mongoose.Schema({
    id: { type: String }, // grade + unit + lesson + part
    grade: { type: String },
    gradId: { type: String }, // number
    unitId: { type: String }, // grade + unit
    lessonId: { type: String }, // grade + unit + lesson
    partId: { type: String }, // grade + unit + lesson + part
    unitName: { type: String },
    lessonName: { type: String },
    partName: { type: String },
    description: { type: String },
    uriVideo: { type: String },
}, {
    timestamps: true

})

const ContentModel = mongoose.model("content", contentSchema)

module.exports = ContentModel