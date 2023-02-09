const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express()
const compression = require('compression')
    // const fileUpload = require('express-fileUpload')


require('dotenv').config()
require('./startup/routes')(app)

// app.use(express.l)
app.use(express.json())
app.use(compression())

app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(helmet())



let conn_string = process.env.database_con
const to_conn_string = String(conn_string)

console.log("connect", conn_string)
require('./startup/connection')(to_conn_string, { useNewUrlParser: true, useUnifiedTopology: true })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Hallos... this app is listenining on ${port}`))