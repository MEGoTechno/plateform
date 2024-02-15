const multer = require("multer")


const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        console.log("store", req.body)
        // const fileName = `${Date.now()}_${file.originalname.replace(" ", "-")}`
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

module.exports = upload