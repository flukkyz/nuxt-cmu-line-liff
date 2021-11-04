const cmuUtility = require('../config/cmu-utility')
const lineUtility = require('../config/line-utility')
const axios = require('axios')
const line = require('@line/bot-sdk')
const fs = require('fs')

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

const BACKEND_API = `${process.env.API_URL}${process.env.API_DIR}`

const headersCoin = {
  'X-CMC_PRO_API_KEY': 'c06d8809-22a8-4471-b7a4-d4f99d275c91'
}

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

const getContent = (messageId) => {
  let writeStream = fs.createWriteStream('./static/uploads/chats/secret.jpg');
  client.getMessageContent(messageId).then((stream) => {
    stream.on('data', (chunk) => {
      console.log(chunk);
    })
    stream.pipe(writeStream)
    stream.on('error', (e) => {
      console.log(e)
    })
    stream.on('end', (e) => {
      console.log('END')
      console.log('END')
      console.log('END')
      console.log('END')
    })
  })
}

module.exports = {
  index: async (req, res) => {
    const event = req.body.events[0]
    const replyToken = event.replyToken
    const userId = event.source.userId
    // console.log(event);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userId}`
    }

    // if(event.message.type === 'image'){
    //   await getContent(event.message.id)
    // }


    const checkUser = await axios.get(`${BACKEND_API}users/lineid/${userId}`)
    if (checkUser.data.status === 'ok') {
      const resp = []
      try {
        const chatStatusData = await axios.get(`${BACKEND_API}line/users/chat`,{headers})
        console.log(chatStatusData.data);
        if(chatStatusData.data.chat){
          console.log('true');
          const data = await axios.put(`${BACKEND_API}line/helpdesk/message/${chatStatusData.data._id}`,{headers})
          resp.push(cmuUtility.salary(data.data.data))
          // notify to admin
        }else{
          if (event.type === "message") {
            const msg = event.message.text
            if(msg === 'salary') {
              const data = await axios.get(`${BACKEND_API}line/users/income`,{headers})
              resp.push(cmuUtility.salary(data.data.data))
            } else if(msg === 'leave') {
              const data = await axios.get(`${BACKEND_API}line/users/leavehistory`,{headers})
              resp.push(cmuUtility.leave(data.data.data))
            } else if(msg === 'document') {
              const data = await axios.get(`${BACKEND_API}line/users/edoc`,{headers})
              resp.push(cmuUtility.document(data.data.data))
            } else if(msg === 'faq') {
              const data = await axios.get(`${BACKEND_API}line/faqs`,{headers})
              resp.push(cmuUtility.faq(data.data.data))
            } else {
              try {
                // const searchSymbol = `${msg.toUpperCase()}USDT`
                // const data = await axios.get(`https://api.binance.com/api/v3/exchangeInfo?symbol=${searchSymbol}`)
                // const dataPrice = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${searchSymbol}`)
                // resp.push(lineUtility.symbol(data.data.symbols[0].baseAsset,dataPrice.data.price,dataPrice.data.price*33))

                const dataUSD = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${msg.toUpperCase()}&convert=USD`,{headers: headersCoin})
                if(dataUSD.data.status.error_code === 0){
                  const dataTHB = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${msg.toUpperCase()}&convert=THB`,{headers: headersCoin})
                  resp.push(lineUtility.symbol(msg.toUpperCase(),dataUSD.data.data[msg.toUpperCase()].name,dataUSD.data.data[msg.toUpperCase()].quote.USD.price,dataTHB.data.data[msg.toUpperCase()].quote.THB.price,dataUSD.data.data[msg.toUpperCase()].quote.USD.percent_change_24h))
                }else{
                  resp.push(lineUtility.sticker('11537','52002751'))
                  resp.push(lineUtility.message(`หมดโควต้าดูราคาเหรียญแล้ว รอเดือนหน้าเน้อ...`))
                }
              } catch (error) {
                console.log(error);
                resp.push(lineUtility.sticker('11537','52002773'))
                resp.push(lineUtility.message(`เห้ย!! อย่าพิมพ์มั่วสิ`))
              }
            }
          } else if(event.type === "postback") {
            const postback = JSON.parse('{"' + event.postback.data.replace(/&/g, '","').replace(/=/g,'":"') + '"}', (key, value) => {
              return key===""?value:decodeURIComponent(value)
            })
            if(postback.action === 'faq') {
              const data = await axios.get(`${BACKEND_API}line/faqs/${postback.id}`,{headers})
              resp.push(cmuUtility.faqPostback(data.data.data))
            }
          }
        }
      } catch (e) {
        console.log(e)
        resp.push(lineUtility.sticker('11537','52002739'))
        resp.push(lineUtility.message(`เกิดข้อผิดพลาดจากระบบ กรุณาลองใหม่ภายหลัง`))
      }
      reply(replyToken,resp)
    }else{
      reply(replyToken,cmuUtility.register)
    }
    res.send("HTTP POST request sent to the webhook URL!")
  }
}