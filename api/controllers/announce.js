const utility = require('../config/line-utility')
const axios = require('axios')
const line = require('@line/bot-sdk')

const LINE_API = `https://api.line.me/v2/bot/message/`

const headersLine = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
}

const push = async (to,messages) => {
  try {
    await axios.post(`${LINE_API}push`,{
      to,
      messages
    },{headers: headersLine})
  } catch (e) {
    console.log(e)
  }
}
const multicast = async (to,messages) => {
  try {
    await axios.post(`${LINE_API}multicast`,{
      to,
      messages
    },{headers: headersLine})
  } catch (e) {
    console.log(e)
  }
}
const broadcast = async (messages) => {
  try {
    await axios.post(`${LINE_API}broadcast`,{
      messages
    },{headers: headersLine})
  } catch (e) {
    console.log(e)
  }
}


module.exports = {
  index: async (req, res) => {
    let data = req.body

    const resp = []
    if (req.file) {
      resp.push(utility.image(`${process.env.BASE_URL}${req.file.path.replace('static', '')}`))
    }else{
      resp.push(utility.message(data.txt))
    }

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
        sendTo = users.data.data.filter(ele => data.users.includes(ele.lineid)).map(ele => ele.lineid)
      }
    } catch (e) {
      res.status(500).json({
        message: 'Cannot GET API #1 '+e
      })
    }
    
    console.log('sendTo',sendTo);
    try {
      if(sendTo && sendTo.length === 1){
        await push(sendTo[0],resp)
      }else{
        if(data.send_type === 'all'){
          await broadcast(resp)
        }else{
          await multicast(sendTo,resp)
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