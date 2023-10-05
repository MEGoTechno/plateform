const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUri: { type: String },
    userName: { type: String, required: true, unique: true }, // as id
    email: { type: String, required: false },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String },
    familyPhone: { type: String },
    grade: { type: String },
    examsPassed: [{
        id: { type: String }, // grade + unit + lesson + part + question
        partName: { type: String },
        mark: { type: String },
        examGrade: { type: String },
        options: [{
            id: { type: String }, // grade + unit + lesson + part + question + option
            title: { type: String },
        }],
    }]
}, {
    timestamps: true
})

const UserModel = mongoose.model("users", userSchema)
module.exports = UserModel