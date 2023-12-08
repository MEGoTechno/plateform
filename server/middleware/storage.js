const multer = require("multer")
const express = require("express")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const admin = req.admin
        const isExist = fs.existsSync("./public/" + admin.userName)

        if (!isExist && admin.userName) {
            fs.mkdirSync('./public/' + admin.userName)
            cb(null, './public/' + admin.userName)
            return;

        } else if (admin.userName) {
            cb(null, './public/' + admin.userName)

        } else {
            cb(null, './public')
        }

    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${file.originalname.replace(" ", "-")}`
        cb(null, fileName)
    }
})
const upload = multer({ storage })

module.exports = upload