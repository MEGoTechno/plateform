const { getStorage, ref } = require("firebase-admin/storage")
const { initializeApp, cert } = require("firebase-admin/app")
const dotenv = require("dotenv")

// config
dotenv.config()
initializeApp({
    credential: cert({
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    }),
    storageBucket: process.env.STORAGE_BUCKET
})


const storage = getStorage().bucket("images")
module.exports = storage