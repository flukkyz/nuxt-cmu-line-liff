const express = require('express')
const { announceController } = require('../controllers')

const upload = require('../config/multer')

const router = express.Router()

const path = '/announce'

router.post(`${path}`, upload.single('announce_img'), announceController.index)


module.exports = router