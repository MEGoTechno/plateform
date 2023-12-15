const cloudinary = require("cloudinary").v2
const dotenv = require("dotenv")


// congig
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const addToCloud = (path, settings) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await cloudinary.uploader.upload(path, settings)
            if (result) {
                resolve(result)
            }
        } catch (error) {
            reject(result)
        }
    })
}

module.exports = addToCloud