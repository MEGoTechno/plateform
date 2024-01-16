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
const examsRouter = require("./routes/examsRoutes")
const contentRouter = require("./routes/contentRoutes")
const settingsRouter = require("./routes/settingsRoutes")
const { notFound, errorrHandler } = require("./middleware/errors")
const { default: mongoose } = require("mongoose")
const UserModel = require("./models/UserModel")
const ExamModel = require("./models/examModel")
const SettingsModel = require("./models/SettingsModel")
const router = require("./routes/userRoutes")
const addToCloud = require("./middleware/cloudinary")
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


cloudinary.config({
    cloud_name: "djbmm1kfz",
    api_key: "213788292784721",
    api_secret: "cz8gOSaBcpvHA1jd8NempmFKtF0"
})


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


app.get("/test", async (req, res)=> {
    console.log("test")
    await mongoose.connect(DB_URI)  
    const users = await UserModel.find({})
    console.log(users)
    res.json({msg: users})
})














// for errors 
app.use(notFound)
app.use(errorrHandler)

const port = process.env.PORT || 5001
const DB_URI = process.env.MONGO_URI





app.listen(port, async () => {
    console.log(`the app is working on port: ${port}`)
})
