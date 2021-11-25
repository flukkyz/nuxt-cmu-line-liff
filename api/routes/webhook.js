const express = require('express')
const { webhookController } = require('../controllers')

const axios = require('axios')

const router = express.Router()

const path = '/webhook'

router.post(`${path}/`, webhookController.index)

router.get(`${path}/test`,(req,res) => {
  console.log('test ...............................');

  var options = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/auto-complete',
    params: {q: 'tesla', region: 'US'},
    headers: {
      'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
      'x-rapidapi-key': 'a9b7101e0dmsh9d51c5f2ef8c0e6p17bf57jsnddb1d5cabb79'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  
  res.json({a: 1})
})

module.exports = router