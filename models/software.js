const mongoose = require('mongoose')

const softwareSchema = new mongoose.Schema({
    name: { type: String },

})

const software = mongoose.model('software', softwareSchema)
exports.software = software
exports.softwareSchema = softwareSchema