const cmuUtility = require('../config/cmu-utility')
const lineUtility = require('../config/line-utility')
const axios = require('axios')
const line = require('@line/bot-sdk')

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

const BACKEND_API = `${process.env.API_URL}${process.env.API_DIR}`

const reply = (replyToken,messages) => {
  client.replyMessage(replyToken, messages).catch((e) => {
    console.log(e)
  })
}
const push = (to,messages) => {
  client.pushMessage(to, messages).catch((e) => {
    console.log(e)
  })
}

module.exports = {
  index: async (req, res) => {
    const event = req.body.events[0]
    const replyToken = event.replyToken
    const userId = event.source.userId
    console.log(event.source);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userId}`
    }
    try {
      const urlCheckIsUser = `${process.env.BACKEND_API}users/lineid/${userId}`
      const user = await this.$axios.$get(urlCheckIsUser)
      this.datas = user
      if (user.status === 'ok') {
        this.profile = {
          ...profile,
          ...user.data
        }
        this.$overlay.hide()
      } else {
        const authen = await this.$axios.$get(`${process.env.apiUrl}${process.env.oAuthAuthorize}?page=${this.$route.path.replace('/liff/', '')}`)
        window.location = authen.data
      }
    } catch (error) {
      
    }
    const resp = []
    try {
      if (event.type === "message") {
        const msg = event.message.text
        if(msg === 'salary') {
          await reply(replyToken,lineUtility.message(`กำลังโหลดข้อมูลเงินเดือน`))
          const data = await axios.get(`${BACKEND_API}line/users/income`,{headers})
          resp.push(cmuUtility.salary(data.data.data))
        } else if(msg === 'leave') {
          await reply(replyToken,lineUtility.message(`กำลังโหลดข้อมูลการลา`))
          const data = await axios.get(`${BACKEND_API}line/users/leavehistory`,{headers})
          resp.push(cmuUtility.leave(data.data.data))
        } else if(msg === 'document') {
          resp.push(lineUtility.sticker('11537','52002746'))
          resp.push(lineUtility.message('อยู่ในระหว่างปรับปรุงส่วนนี้'))
          // await reply(replyToken,lineUtility.message(`กำลังโหลดข้อมูลการ E-Document`))
          // resp.push(lineUtility.document())
        } else if(msg === 'faq') {
          await reply(replyToken,lineUtility.message(`กำลังโหลดข้อมูลการ FAQ`))
          const data = await axios.get(`${BACKEND_API}line/faqs`,{headers})
          resp.push(cmuUtility.faq(data.data.data))
        } else {
          try {
            const searchSymbol = `${msg.toUpperCase()}USDT`
            const data = await axios.get(`https://api.binance.com/api/v3/exchangeInfo?symbol=${searchSymbol}`)
            const dataPrice = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${searchSymbol}`)
            resp.push(lineUtility.symbol(data.data.symbols[0].baseAsset,dataPrice.data.price,dataPrice.data.price*33))
          } catch (error) {
            resp.push(lineUtility.sticker('11537','52002773'))
            resp.push(lineUtility.message(`เห้ย!! อย่าพิมพ์มั่วสิ`))
          }
        }
      } else if(event.type === "postback") {
        const postback = JSON.parse('{"' + event.postback.data.replace(/&/g, '","').replace(/=/g,'":"') + '"}', (key, value) => {
          return key===""?value:decodeURIComponent(value)
        })
        if(postback.action === 'faq') {
          await reply(replyToken,lineUtility.message(`กำลังโหลด FAQ: ${postback.title}`))
          const data = await axios.get(`${BACKEND_API}line/faqs/${postback.id}`,{headers})
          resp.push(cmuUtility.faqPostback(data.data.data))
        }
      }
    } catch (e) {
      console.log(e)
      resp.push(lineUtility.sticker('11537','52002739'))
      resp.push(lineUtility.message(`เกิดข้อผิดพลาดจากระบบ กรุณาลองใหม่ภายหลัง`))
    }
    push(userId,resp)
    res.send("HTTP POST request sent to the webhook URL!")
  }
}