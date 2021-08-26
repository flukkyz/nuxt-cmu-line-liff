const utility = require('../config/line-utility')
const axios = require('axios')

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.ChannelAccessToken}`
};

module.exports = {
  index: async (req, res) => {
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
      } else {
        resp.push(utility.message(`${msg} ยังไม่มีนะ ...`));
      }

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