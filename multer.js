const multer = require('multer')
const express = require('express')
const app = express()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    },
})
const uploadFile = multer({ storage: storage })


exports.uploadFile = uploadFile