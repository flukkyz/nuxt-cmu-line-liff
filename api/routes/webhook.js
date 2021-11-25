const express = require('express')
const { webhookController } = require('../controllers')

const google = require("google-finance-data");

const router = express.Router()

const path = '/webhook'

router.post(`${path}/`, webhookController.index)

router.get(`${path}/test`,(req,res) => {
  console.log('test ...............................');
  google.getSymbol("msft")
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error(err.stack ? err.stack : err));

  res.json({a: 1})
})

module.exports = router