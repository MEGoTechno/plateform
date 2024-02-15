const mongoose = require("mongoose")

const GradeSchema = new mongoose.Schema({
    gradeId: {type: String, unique: true},
    gradeName: {type: String}
})

const GradeModel = mongoose.model("grade", GradeSchema)
module.exports = GradeModel