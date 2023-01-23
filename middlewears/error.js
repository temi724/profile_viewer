// const winston = require('winston')

module.exports = function (err, req, res, next) {
    // winston.addColors({ error: "red" })
    console.log(err.message, err)

    //Log
    res.status(500).send('Something went wrong')
}