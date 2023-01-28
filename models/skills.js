const mongoose = require('mongoose')

const skillsSchema = new mongoose.Schema({
    name: {
        type: String
    },

})

const skills = new mongoose.model('skills', skillsSchema)
exports.skills = skills
exports.skillsSchema = skillsSchema