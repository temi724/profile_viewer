const mongoose = require('mongoose')
const { languageSchema } = require('./languages')

const Candidate = mongoose.model('Candidate', new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    education: [{ type: String }],

    interest: [{ type: String }],
    languages: [{ languageSchema }],
    // languages: [{ types: Schema.Types.ObjectId, ref: 'language' }],
    extraVersion: {
        type: Number
    },
    emotionalStability: {
        type: Number
    },
    agreeableness: {
        type: Number
    },
    openess: {
        type: Number
    },
    conscientiousness: {
        type: Number
    },
    english: {
        type: Number
    },
    technical: {
        type: Number
    },
    OtherArt: {
        type: Number
    },

    software: [{ title: String, level: String }],

    skills: [{
        name: String,
        level: Number
    }],
    avatar: {
        type: String
    },
    avatarUrl: {
        name: String
    },
    experience: [{ title: String, duration: String }],
    comment: {
        type: String
    }

}))
exports.Candidate = Candidate