const express = require('express')
const { locationController } = require('../controllers')

const { checkBody } = require('../middlewares')

const router = express.Router()

const path = '/location'

router.post(`${path}`, checkBody, locationController.sendLocation)

module.exports = router