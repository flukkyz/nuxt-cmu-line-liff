const utility = require('../config/line-utility')
const axios = require('axios')
const line = require('@line/bot-sdk')

module.exports = {
  index: async (req, res) => {
    let data = req.body

    const resp = []
    if (req.file) {
      resp.push(utility.image(`${process.env.BASE_URL}${req.file.path.replace('static', '')}`))
    }else{
      resp.push(utility.message(data.txt))
    }

    const client = new line.Client({
      channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
    })

    let sendTo
    try {
      const users = await axios.get(`${process.env.API_URL}${process.env.API_DIR}users`)
      if(data.send_type === 'personnel'){
        sendTo = users.data.data.filter(ele => !ele.isStudent).map(ele => ele.lineid)
      }else if(data.send_type === 'student'){
        sendTo = users.data.data.filter(ele => ele.isStudent).map(ele => ele.lineid)
      }else if(data.send_type === 'except'){
        sendTo = users.data.data.filter(ele => !data.users.includes(ele.lineid)).map(ele => ele.lineid)
      }else{
        sendTo = data.users
      }
    } catch (e) {
      res.status(500).json({
        message: 'Cannot GET API #1 '+e
      })
    }
    
    console.log('sendTo',sendTo);
    try {
      if(sendTo && sendTo.length === 1){
        await client.pushMessage(sendTo,resp)
      }else{
        if(data.send_type === 'all'){
          await client.broadcast(resp)
        }else{
          await client.multicast(sendTo,resp)
        }
      }
      res.json({status: 'ok'})
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: 'Cannot POST API #2 '+e
      })
    }
  }
}