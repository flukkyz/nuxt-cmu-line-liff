const express = require('express')
const { webhookController } = require('../controllers')

const googleStocks = require('google-stocks');

const router = express.Router()

const path = '/webhook'

router.post(`${path}/`, webhookController.index)

router.get(`${path}/test`,(req,res) => {
  console.log('test ...............................');
  googleStocks(['AAPL'])
  .then((data) => {
    console.log(data);
    res.json({a: 1})
  })
  .catch((error) => {
    console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
    console.log(error);
    res.json({a: 1})
  });

})

module.exports = router