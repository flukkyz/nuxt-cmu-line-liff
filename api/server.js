require('dotenv').config()
const express = require('express')
const cors = require('cors')
const ws = require('ws');

var wsClient = new ws('wss://mis-api.cmu.ac.th/mis/lineapp/ws/api', 'protocol')
const { notFound, handleError } = require('./middlewares')
const routes = require('./routes')

const app = express()

global.wsClient.onopen = (event) => {
  console.log('Successfully connected to the echo websocket server...')
}

app.use(express.json({limit: '50mb'}))
app.use(cors())
app.use(express.urlencoded({
  limit: '50mb',
  extended: false
}))

app.use(routes)

app.use(notFound)
app.use(handleError)

module.exports = {
  path: '/api',
  handler: app
}
