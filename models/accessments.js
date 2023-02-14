const mongoose = require('mongoose')

const assessmentSChema = new mongoose.Schema({
    name: [{
        type: String
    }]
})

const assessments = mongoose.model('assessments', assessmentSChema)
exports.assessments = assessments
exports.assessmentSChema = assessmentSChema