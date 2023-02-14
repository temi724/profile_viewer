const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express()
const compression = require('compression')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const fileUpload = require('express-fileUpload')


require('dotenv').config()
require('./startup/routes')(app)
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hello World',
            version: '1.0.0',
        },
    },
    apis: ['./startup/routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
// app.use(express.l)
app.use(express.json())
app.use(compression())

app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(helmet())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));




let conn_string = process.env.database_con
const to_conn_string = String(conn_string)

console.log("connect", conn_string)
require('./startup/connection')(to_conn_string, { useNewUrlParser: true, useUnifiedTopology: true })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Hallos... this app is listenining on ${port}`))