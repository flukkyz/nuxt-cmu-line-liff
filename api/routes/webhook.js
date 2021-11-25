const express = require('express')
const { webhookController } = require('../controllers')

googleFinance = require('google-finance');

const router = express.Router()

const path = '/webhook'

router.post(`${path}/`, webhookController.index)

router.get(`${path}/test`,(req,res) => {
  console.log('test ...............................');
  googleFinance.historical({
    symbol: 'BKK:PLANB',
    from: '2014-01-01',
    to: '2014-12-31'
  }, function (err, quotes) {
    if(err){
      console.log("error");
      console.log(err);
    }
    console.log(quotes);
    //...
  });
  res.json({a: 1})
})

module.exports = router