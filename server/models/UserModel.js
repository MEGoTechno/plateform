const mongoose = require("mongoose")
const GradeModel = require("./GradeModel")
const GroupModel = require("./GroupModel")
const { user_roles } = require("../tools/rolesConstants")

const userSchema = new mongoose.Schema({
    grade: { type: mongoose.Schema.Types.ObjectId, ref: GradeModel },
    group: { type: mongoose.Schema.Types.ObjectId, ref: GroupModel },
    name: { type: String },
    avatar: {
        original_filename: { type: String },
        secure_url: { type: String },
        url: { type: String },
        size: { type: Number },
        resource_type: { type: String },
        format: { type: String }
    },
    userName: { type: String, required: true, unique: true }, // as id
    email: { type: String, required: false },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String },
    familyPhone: { type: String },
    isActive: { type: Boolean, default: true },
    role: {
        type: String, default: user_roles.STUDENT,
        enum: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.STUDENT]
    },
    totalPoints: { type: Number, default: 0 },
    payments: [{ type: String }],
}, {
    timestamps: true,
    versionKey: false
})



const UserModel = mongoose.model("user", userSchema)
module.exports = UserModel