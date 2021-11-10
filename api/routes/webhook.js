const express = require('express')
const { webhookController } = require('../controllers')

const router = express.Router()

const path = '/webhook'

router.post(`${path}/`, webhookController.index)


//-----------------------------------------
const { io } = require("socket.io-client");
router.get(`${path}/test`, async (req,res) => {
  try {
    const socket = io(process.env.BASE_URL);
    socket.on('abc', (msg) => {
      socket.disconnect()
    })
    await socket.emit('abc', 'SERVERRRRRRRRRRRRRRR')
  } catch (error) {
    console.log(error);
  }
  res.send('value');
})
//-----------------------------------------


module.exports = router