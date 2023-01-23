const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
let key = process.env.profile_key
require('dotenv').config()


const AdminSchema = new mongoose.Schema({
    email: {
        type: String
    },

    password: {
        type: String
    },
    isAdmin: {
        type: Boolean
    }
})

//This method generate user security token for confirmation on login...
AdminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({

        email: this.email,
        isAdmin: this.isAdmin
    }, key)
    return token

}

const Admin = mongoose.model('Admin', AdminSchema)
exports.Admin = Admin