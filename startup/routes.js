const express = require('express')
const admin = require('../routes/admin')

const error = require('../middlewears/error')
const auth = require('../routes/auth')
const profile = require('../routes/profile')

const cors = require('cors')

module.exports = function (app) {
    app.use(cors())
    app.use(express.json())
    app.use('/api/admin', admin)
    app.use('/api/profile', profile)

    app.use('/api/auths', auth)
    app.use(error)

}