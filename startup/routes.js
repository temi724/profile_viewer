const express = require('express')
const admin = require('../routes/admin')

const error = require('../middlewears/error')
const auth = require('../routes/auth')
const profile = require('../routes/profile')
const uploader = require('../routes/uploads')

const cors = require('cors')

module.exports = function(app) {
    app.use(cors({
        origin: '*'
    }))
    app.use(express.json())
    app.use('/api/admin', admin)
    app.use('/api/profile', profile)
    app.use('/api/push', uploader)
    app.use('/api/auths', auth)
    app.use(error)

}