const utility = require('../config/line-utility')
const axios = require('axios')

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
};

const BACKEND_API = `${process.env.API_URL}${process.env.API_DIR}`;


module.exports = {
  index: async (req, res) => {
    const event = req.body.events[0];
    const userId = event.source.userId;
    if (event.type === "message") {
      const msg = event.message.text
      let resp = [];

      const backendHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userId}`
      };

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
      } else if(msg === 'salary') {
        const data = axios.get(`${BACKEND_API}line/users/income`,{
          headers: backendHeaders
        })
        console.log(data.data);
        resp.push(utility.salary(15000));
      } else if(msg === 'leave') {
        resp.push(utility.leave());
      } else if(msg === 'document') {
        resp.push(utility.document());
      } else if(msg === 'test3') {
        resp.push(utility.test3());
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
    res.send("HTTP POST request sent to the webhook URL!")
  }
}