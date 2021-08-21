require('dotenv').config()
const express = require('express')
const cors = require('cors')

const { notFound, handleError } = require('./middlewares')
const routes = require('./routes')
const logger = require('./config/logger')

const app = express()

app.use(express.json({limit: '50mb'}))
app.use(cors())
app.use(express.urlencoded({
  limit: '50mb',
  extended: false
}))
app.use(logger)

app.use(routes)

app.use(notFound)
app.use(handleError)

module.exports = {
  path: '/api',
  handler: app
}
