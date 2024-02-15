const mongoose = require("mongoose")
const GradeModel = require("./GradeModel")

const lectureSchema = new mongoose.Schema({
    grade: { type: mongoose.Schema.Types.ObjectId, ref: GradeModel },
    unitId: { type: String}, // grade + unit
    unitName: { type: String },
    lessonId: { type: String}, // grade + unit + lesson
    lessonName: { type: String },
    partId: { type: String}, // grade + unit + lesson + part
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

const LectureModel = mongoose.model("lecture", lectureSchema)

module.exports = LectureModel