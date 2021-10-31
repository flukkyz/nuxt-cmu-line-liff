const cmuUtility = require('../config/cmu-utility')
const lineUtility = require('../config/line-utility')
const axios = require('axios')

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADERS = {
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

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userId}`
      };

      if(msg === 'salary') {
        const data = await axios.get(`${BACKEND_API}line/users/income`,{headers})
        resp.push(cmuUtility.salary(data.data.data));
      } else if(msg === 'leave') {
        const data = await axios.get(`${BACKEND_API}line/users/leavehistory`,{headers})
        // console.log(lineUtility.leave())
        // console.log('===============');
        // console.log(cmuUtility.leave(data.data.data));
        resp.push(cmuUtility.leave(data.data.data));
      } else if(msg === 'document') {
        resp.push(lineUtility.document());
      } else {
        resp.push(lineUtility.message(`${msg} ยังไม่มีนะ ...`));
      }

      try {
        await axios({
          method: 'post',
          url: `${LINE_MESSAGING_API}/reply`,
          data: JSON.stringify({
            replyToken: event.replyToken,
            messages: resp
          }),
          headers: LINE_HEADERS
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