const mongoose = require('mongoose')


const accessmentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    level: {
        type: Number
    }
})

const accessment = new mongoose.model('accessment', accessmentSchema)
exports.accessment = accessment
exports.accessmentSchema = accessmentSchema