const jwt = require('jsonwebtoken')
let key = process.env.one_way_interviewKEY
require('dotenv').config()


function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('You dont have rights')
    try {
        const decode = jwt.verify(token, key)
        req.user = decode
        next()
    } catch (ex) {
        res.status(400).send('invalid token')
    }

}

module.exports = auth