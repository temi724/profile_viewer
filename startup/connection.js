const mongoose = require('mongoose')
// const winston = require('winston')



module.exports = function (connection_string) {

    mongoose.connect(connection_string, {})

        .then(() => console.log('connected to interview db'))
        .catch(err => console.error('Error connecting', err))
}