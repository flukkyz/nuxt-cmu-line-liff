const express = require('express')
const { webhookController } = require('../controllers')

googleFinance = require('google-finance');

const router = express.Router()

const path = '/webhook'

router.post(`${path}/`, webhookController.index)

router.get(`${path}/test`,(req,res) => {
  console.log('test ...............................');
  // googleFinance.companyNews({
  //   symbol: 'NASDAQ:AAPL'
  // }, function (err, news) {
  //   console.log(news);
  //   // res.send("HTTP POST request sent to the webhook URL!")
  // });
  res.json({a: 1})
})

module.exports = router