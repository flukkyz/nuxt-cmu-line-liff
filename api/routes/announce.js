const express = require('express')
const { announceController } = require('../controllers')

const router = express.Router()

const path = '/announce'

router.post(`${path}`, announceController.index)


module.exports = router