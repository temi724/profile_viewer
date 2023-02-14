const mongoose = require('mongoose')

const interestSchema = new mongoose.Schema({
    name: {
        type: String
    }
})

const interests = mongoose.model('interests', interestSchema)
exports.interests = interests
exports.interestSchema = interestSchema