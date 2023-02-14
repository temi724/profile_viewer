const mongoose = require('mongoose')

const langugeSchema = new mongoose.Schema({
    name: [
        { type: String }
    ]
})

const language = mongoose.model('language', langugeSchema)
exports.language = language
exports.languageSchema = langugeSchema