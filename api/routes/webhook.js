const express = require('express')
const { webhookController } = require('../controllers')

const router = express.Router()

const path = '/webhook'

router.post(`${path}/`, webhookController.index)

module.exports = router