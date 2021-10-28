const utility = require('../config/line-utility')
const axios = require('axios')
const line = require('@line/bot-sdk');

module.exports = {
  index: async (req, res) => {
    let data = req.body
    let sendTo
    try {
      const users = await axios.get(`${process.env.API_URL}${process.env.API_DIR}users`)
      if(data.send_type === 'all'){
        sendTo = users.data.data.map(ele => ele.lineid)
      }else if(data.send_type === 'personnel'){
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
    const resp = [];
    if (req.file) {
      resp.push(utility.image(`${process.env.BASE_URL}${req.file.path.replace('static', '')}`))
    }else{
      resp.push(utility.message(data.txt))
    }

    const client = new line.Client({
      channelAccessToken: 'i6DNvKSVEeXmQC+IAdPqghQwxqmBj0ZTvTZLTf5Vk2A2GVxHZXrdFjk/8A7uE4aamuIc8hFOgUdPG+zDyGy+56cp6J9tYIIKyRDUPs3aR/4ttoyzahApREp03DQXjFhAxHAycFB8EFnVcq9LGuhaagdB04t89/1O/w1cDnyilFU='
      // channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
    });

    console.log(sendTo);
    console.log(resp);

    
    try {
      // await client.multicast(data.users,resp).then(() => {
      //   res.json({status: 'ok'})
      // })
      // .catch((err) => {
      //   console.log(err);
      //   // error handling
      // })
      await client.multicast(sendTo, [
        {
          type: 'text',
          text: 'ทดสอบ'
        }
      ])
      .then(() => {
        res.json({status: 'ok'})
      })
      .catch((err) => {
        console.log(err);
      });
      // res.json({status: 'ok'})
    } catch (e) {
      res.status(500).json({
        message: 'Cannot POST API #2 '+e
      })
    }
  }
}