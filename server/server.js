const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser")
const helmet = require("helmet")
const morgan = require("morgan")
const app = express()
const multer = require("multer")
const fs = require("fs")
const upload = require("./middleware/storage")
const cloudinary = require("cloudinary").v2

// get fc routes
const userRouter = require("./routes/userRoutes")
const messagesRoutes = require("./routes/messagesRoutes")

const lecturesRoutes = require("./routes/lecturesRoutes")
const examsRouter = require("./routes/examsRoutes")
const attemptRoutes = require("./routes/attemptRoutes")

const gradesRouter = require("./routes/gradesRoutes")
const groupsRouter = require("./routes/groupsRoutes")

const paymentRouter = require("./routes/paymentRoutes")

const { notFound, errorrHandler } = require("./middleware/errorsHandler")
const { default: mongoose } = require("mongoose")
const UserModel = require("./models/UserModel")
const ExamModel = require("./models/examModel")
const SettingsModel = require("./models/GradeModel")
const addToCloud = require("./middleware/cloudinary")
const verifyToken = require("./middleware/verifyToken")

// config
dotenv.config()
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('tiny'))

// for secure folders
app.use("/secure", verifyToken, (req, res, next) => {
    next()
})
app.use("/secure", express.static("secure"))

// routes
app.use("/api/client", userRouter)
app.use("/api/exams", examsRouter)
app.use("/api/lectures", lecturesRoutes)
app.use("/api/messages", messagesRoutes)
app.use("/api/attempts", attemptRoutes)

app.use("/api/grades", gradesRouter)
app.use("/api/groups", groupsRouter)

app.use("/api/payments", paymentRouter)


app.use("/upload", upload.fields([{ name: "video" }, { name: "thumbnail" }]), async (req, res, next) => {
    console.log("start sending")
    try {
        const { files } = req
        console.log(files)
        let results = {}
        for (let file in files) {
            console.log(files[file][0].path)
            const result = await addToCloud(files[file][0].path, {
                folder: "admin",
                resource_type: "auto"
            })
            if (result) {
                const { original_filename, resource_type, secure_url, url, format, bytes } = result
                results[file] = { original_filename, resource_type, secure_url, url, format, size: bytes }
            }
        }

        console.log(results)
        res.json(results)
    } catch (error) {
        res.json(error)
        console.log(error)
    }
})

app.get("/test", async (req, res) => {
    console.log("test")
    await mongoose.connect(DB_URI)
    const users = await UserModel.find({})
    console.log(users)
    res.json({ message: users })
})

// for errors 
app.use(notFound)
app.use(errorrHandler)

const port = process.env.PORT || 5001
const DB_URI = process.env.MONGO_URI

mongoose.connect(DB_URI).then(() => {
    console.log("connected")
})

app.listen(port, async () => {
    console.log(`the app is working on port: ${port}`)
})
