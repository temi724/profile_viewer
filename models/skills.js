const mongoose = require('mongoose')

const skillsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    level: {
        type: Number
    }
})

const skills = new mongoose.model('skills', skillsSchema)
exports.skills = skills
exports.skillsSchema = skillsSchema