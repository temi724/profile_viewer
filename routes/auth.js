const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')


const { Admin } = require('../models/admin')

/**
 * Right now only admin needs to be able to login..
 * if users need to login in the future, kindly generalize the login and enable 
 * token generation from users model and not the admin model.
 */
router.post('/login', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    //Check list of admin to make sure admin exists
    const admin = await Admin.findOne({ email: req.body.email })
    if (!admin) return res.status('400').send('Invalid email or password')
    const password = await bcrypt.compare(req.body.password, admin.password)
    if (!password) return res.status(400).send('Invalid email or password')

    const token = admin.generateAuthToken()

    res.send(token)


})
module.exports = router
