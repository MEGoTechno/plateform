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


// get fc routes
const userRouter = require("./routes/userRoutes")
const examsRouter = require("./routes/examsRoutes")
const contentRouter = require("./routes/contentRoutes")
const settingsRouter = require("./routes/settingsRoutes")
const { notFound, errorrHandler } = require("./middleware/errors")
const { default: mongoose } = require("mongoose")
const UserModel = require("./models/UserModel")
const ExamModel = require("./models/examModel")
const SettingsModel = require("./models/SettingsModel")
const router = require("./routes/userRoutes")
// const UploadRouter = require("./firebase/uploadFirebase")

// config
dotenv.config()
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))
app.use(cors())
app.use(morgan('tiny'))


// app.post("/upload", upload.fields([{name: "image"}]), (req, res) => {
//     const { file } = req
//     res.json({ message: "done" })
// })

// routes
app.use("/client", userRouter)
app.use("/exams", examsRouter)
app.use("/content", contentRouter)
app.use("/settings", settingsRouter)
// app.use("/fire", UploadRouter)

// for errors 
app.use(notFound)
app.use(errorrHandler)

const port = process.env.PORT || 5001
const DB_URI = process.env.MONGO_URI





app.listen(port, async () => {
    console.log(`the app is working on port: ${port}`)
})
