const utility = require('../config/line-utility')
const axios = require('axios')

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
};

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

    
    try {
      console.log('---------------------------------------------------------------------');
      console.log(data.users);
      console.log('----------------------');
      console.log(`${LINE_MESSAGING_API}/multicast`);
      console.log('----------------------');
      console.log(resp);
      console.log('---------------------------------------------------------------------');
      await axios({
        method: 'post',
        url: `${LINE_MESSAGING_API}/push`,
        data: JSON.stringify({
          to: data.users[0],
          messages: resp
        }),
        headers
      })
      res.json({status: 'ok'})
    } catch (e) {
      res.status(500).json({
        message: 'Cannot POST API #2 '+e
      })
    }
  }
}