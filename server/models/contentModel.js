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
    video: {
        original_filename: { type: String, required: true },
        secure_url: { type: String, required: true },
        url: { type: String, required: true },
        size: { type: Number, required: true },
        resource_type: { type: String, required: true },
        format: { type: String, required: true }
    },
    thumbnail: {
        original_filename: { type: String, required: true },
        secure_url: { type: String, required: true },
        url: { type: String, required: true },
        size: { type: Number, required: true },
        resource_type: { type: String, required: true },
        format: { type: String, required: true }
    },
}, {
    timestamps: true

})

const ContentModel = mongoose.model("content", contentSchema)

module.exports = ContentModel