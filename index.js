const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express()


require('dotenv').config()
require('./startup/routes')(app)

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(helmet())




let conn_string = process.env.database_con
const to_conn_string = String(conn_string)

console.log("connect", conn_string)
require('./startup/connection')(to_conn_string, { useNewUrlParser: true, useUnifiedTopology: true })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Hallos... this app is listenining on ${port}`))