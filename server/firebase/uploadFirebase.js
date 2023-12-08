const express = require("express")
const multer = require("multer")
const path = require("path")
const storage = require("./firebaseStorage")

const UploadRouter = express.Router()
const upload = multer({
    storage: multer.memoryStorage()
})

UploadRouter.post("/", upload.single("file"), async (req, res) => {
    try {
        const file = req.file
        if (file) {
            const date = new Date()
            const fileName = `${date.getTime()}_${file.originalname}`

            const blob = storage.file(fileName)
            const blobStream = blob.createWriteStream({
                resumable: false,
                metadata: {
                    contentType: file.mimetype
                }
            });
            // onerror
            blobStream.on("error", (error) => {
                res.json({ messgae: error.message })
            })

            //on success
            blobStream.on("finish", () => {
                const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/0/${blob.fileName}?alt=media`
                res.json({ fileName, fileUrl: publicUrl })
            })

            blobStream.end(file.buffer)
        } else {
            res.json({ message: "upload a file!" })
        }
    } catch (err) {
        res.json({ messgae: err.message })
    }
})

module.exports = UploadRouter