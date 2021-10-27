const utility = require('../config/line-utility')
const axios = require('axios')
const line = require('@line/bot-sdk');

module.exports = {
  index: async (req, res) => {
    let data = req.body
    
    try {
      const users = await axios.get(`${process.env.API_URL}${process.env.API_DIR}users`)
      if(data.send_type === 'all'){
        data.users = users.data.data.map(ele => ele.lineid)
      }else if(data.send_type === 'personnel'){
        data.users = users.data.data.filter(ele => !ele.isStudent).map(ele => ele.lineid)
      }else if(data.send_type === 'student'){
        data.users = users.data.data.filter(ele => ele.isStudent).map(ele => ele.lineid)
      }else if(data.send_type === 'except'){
        data.users = users.data.data.filter(ele => !data.users.includes(ele.lineid)).map(ele => ele.lineid)
      }
    } catch (e) {
      res.status(500).json({
        message: 'Cannot GET API #1 '+e
      })
    }
    const resp = [];
    if (req.file) {
      resp.push(utility.image(`${process.env.BASE_URL}${req.file.path.replace('static', '')}`))
    }else{
      resp.push(utility.message(data.txt))
    }

    const client = new line.Client({
      channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
    });

    
    try {
      // client.multicast(data.users,resp)
      client.pushMessage(data.users[0], resp)
      .then(() => {
        res.json({status: 'ok'})
      })
      .catch((err) => {
        console.log(err);
      });
    } catch (e) {
      res.status(500).json({
        message: 'Cannot POST API #2 '+e
      })
    }
  }
}