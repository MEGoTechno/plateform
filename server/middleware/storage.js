const multer = require("multer")
const express = require("express")
const fs = require("fs")

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        // const fileName = `${Date.now()}_${file.originalname.replace(" ", "-")}`
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

module.exports = upload