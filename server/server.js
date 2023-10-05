const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser")
const helmet = require("helmet")
const morgan = require("morgan")
const app = express()

// get fc routes
const userRouter = require("./routes/userRoutes")
const examsRouter = require("./routes/examsRoutes")
const { notFound, errorrHandler } = require("./middleware/errors")
const { default: mongoose } = require("mongoose")
const UserModel = require("./models/UserModel")
const ExamModel = require("./models/examModel")

// config
dotenv.config()
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('tiny'))

// routes
app.use("/client", userRouter)
app.use("/exams", examsRouter)

// for errors 
app.use(notFound)
app.use(errorrHandler)

const port = process.env.PORT || 5001
const DB_URI = process.env.MONGO_URI

app.listen(port, async () => {
    console.log(`the app is working on port: ${port}`)

})
