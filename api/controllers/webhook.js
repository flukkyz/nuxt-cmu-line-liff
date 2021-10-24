const utility = require('../config/line-utility')
const axios = require('axios')

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
};

module.exports = {
  index: async (req, res) => {
    console.log('test hook');
    res.send("HTTP POST request sent to the webhook URL!")
    let event = req.body.events[0];
    let userId = event.source.userId;
    if (event.type === "message") {
      let msg = event.message.text
      let resp = [];

      if(msg === 'message') {
        resp.push(utility.message(`${msg} รอสักครู่ เดี่ยวส่งให้นะ ...`));
      } else if(msg === 'image') {
        resp.push(utility.image());
      } else if(msg === 'map') {
        resp.push(utility.map());
      } else if(msg === 'temp') {
        resp.push(utility.CarouselTemplate());
      } else if(msg === 'Quick') {
        resp.push(utility.QuickReply(userId));
      } else if(msg === 'test1') {
        resp.push(utility.test1());
      } else if(['salary','เงินเดือน'].includes(msg)) {
        resp.push(utility.salary(15000));
      } else if(['leave','ลา'].includes(msg)) {
        resp.push(utility.leave());
      } else if(['document','doc','e-doc', 'e-document'].includes(msg)) {
        resp.push(utility.document());
      } else if(msg === 'test3') {
        resp.push(utility.test3());
      } else {
        resp.push(utility.message(`${msg} ยังไม่มีนะ ...`));
      }

      console.log(resp)


      try {
        await axios({
          method: 'post',
          url: `${LINE_MESSAGING_API}/reply`,
          data: JSON.stringify({
            replyToken: event.replyToken,
            messages: resp
          }),
          headers
        })
      } catch (e) {
        console.log(e)
      }
    } else if(event.type === "postback") {
      console.log(event.postback.data)
    }
  }
}