const mongoose = require('mongoose')

const assessmentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String
    }
})

const assessment = new mongoose.model('assessment', assessmentSchema)
exports.assessment = assessment
exports.assessmentchema = assessmentSchema