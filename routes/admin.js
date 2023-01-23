const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Admin } = require('../models/admin')
/**
 * I intend to use the method for the creation of admin..
 * Originally, the first few admins will be seeded..
 */

router.post('/', async (req, res) => {

    /**
     *  Add additional model validation using JOI
     * const { error } = validate_Admin(req.body)
     * if (error) return res.status(400).send(error.details[0].message)
     */

    let admin = await Admin.findOne({ email: req.body.email })
    if (admin) return res.status('400').send('Email already exist')

    admin = new Admin({

        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    })
    const salt = await bcrypt.genSalt(10)

    admin.password = await bcrypt.hash(admin.password, salt)
    await admin.save()

    const token = admin.generateAuthToken()

    res
        .header('x-auth-token', token)
        .header("access-control-expose-headers", "x-auth-token")
        .send({
            // name: user.name,
            email: admin.email
        })


})

module.exports = router