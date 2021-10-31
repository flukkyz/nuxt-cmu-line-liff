const cmuUtility = require('../config/cmu-utility')
const lineUtility = require('../config/line-utility')
const axios = require('axios')
const line = require('@line/bot-sdk')

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const BACKEND_API = `${process.env.API_URL}${process.env.API_DIR}`;

const reply = (replyToken,messages) => {
  client.replyMessage(replyToken, messages)
  .catch((e) => {
    console.log(e)
  })
}

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

      try {
        if(msg === 'salary') {
          await reply(event.replyToken,lineUtility.message(`กำลังโหลดข้อมูลเงินเดือน`))
          const data = await axios.get(`${BACKEND_API}line/users/income`,{headers})
          resp.push(cmuUtility.salary(data.data.data));
        } else if(msg === 'leave') {
          await reply(event.replyToken,lineUtility.message(`กำลังโหลดข้อมูลการลา`))
          const data = await axios.get(`${BACKEND_API}line/users/leavehistory`,{headers})
          resp.push(cmuUtility.leave(data.data.data));
        } else if(msg === 'document') {
          await reply(event.replyToken,lineUtility.message(`กำลังโหลดข้อมูลการ E-Document`))
          resp.push(lineUtility.document());
        } else if(msg === 'faq') {
          await reply(event.replyToken,lineUtility.message(`กำลังโหลดข้อมูลการ FAQ`))
          const data = await axios.get(`${BACKEND_API}line/faqs`,{headers})
          resp.push(lineUtility.document());
        } else if(msg === 'A') {
          resp.push(lineUtility.test2());
        } else if(msg === 'S') {
          resp.push(lineUtility.test3());
        } else {
          resp.push(lineUtility.message(`${msg} ยังไม่มีนะ ...`));
        }
      } catch (e) {
        console.log(e)
        resp.push(lineUtility.message(`เกิดข้อผิดพลาดจากระบบ กรุณาลองใหม่ภายหลัง`));
      }

      reply(event.replyToken,resp)
    } else if(event.type === "postback") {
      console.log(event.postback.data)
    }
    res.send("HTTP POST request sent to the webhook URL!")
  }
}