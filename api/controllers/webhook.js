const cmuUtility = require('../config/cmu-utility')
const lineUtility = require('../config/line-utility')
const axios = require('axios')
const line = require('@line/bot-sdk')
const fs = require('fs')
const ws = require('ws');

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

const BACKEND_API = `${process.env.API_URL}${process.env.API_DIR}`

const headersCoin = {
  'X-CMC_PRO_API_KEY': 'c06d8809-22a8-4471-b7a4-d4f99d275c91'
}

const yahooFinanceOptions = {
  method: 'GET',
  url: 'https://yh-finance.p.rapidapi.com/market/v2/get-quotes',
  params: {region: 'SG'},
  headers: {
    'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
    'x-rapidapi-key': 'a9b7101e0dmsh9d51c5f2ef8c0e6p17bf57jsnddb1d5cabb79'
  }
};

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

let wsClient
const connectSocket = () => {
  wsClient = new ws('wss://mis-api.cmu.ac.th/mis/lineapp/ws/api', 'protocol')
  wsClient.onopen = () => {
    console.log('Socket Connected');
  };

  wsClient.onmessage = (e) => {
    console.log('Message:', e.data);
  };

  wsClient.onclose = (e) => {
    console.log('Socket is closed. Reconnect will be now.', e.reason);
    setTimeout(() => {
      connectSocket();
    }, 1);
  };

  wsClient.onerror = (err) => {
    console.error('Socket encountered error: ', err.message, 'Closing socket');
    wsClient.close();
  };
}
connectSocket()

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
        if(chatStatusData.data.chat){
          console.log('IS CHAT');
          wsClient.send(JSON.stringify({
            id: chatStatusData.data._id,
            type: 'text',
            message: event.message.text
          }))
          await axios.put(`${BACKEND_API}line/helpdesks/message/${chatStatusData.data._id}`,{
            content: event.message.text
          },{headers})
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
                // Binance----------------------------------------------------------
                // const searchSymbol = `${msg.toUpperCase()}USDT`
                // const data = await axios.get(`https://api.binance.com/api/v3/exchangeInfo?symbol=${searchSymbol}`)
                // const dataPrice = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${searchSymbol}`)
                // resp.push(lineUtility.symbol(data.data.symbols[0].baseAsset,dataPrice.data.price,dataPrice.data.price*33))
                // Binance----------------------------------------------------------

                yahooFinanceOptions.params.symbols = 'thb=x'
                const usdThb = await axios.request(yahooFinanceOptions)

                const thb = usdThb.data.quoteResponse.result[0].regularMarketPrice

                const splitMsg = msg.trim().split(' ')
                let coin = ''
                let unit = 1
                if(splitMsg.length === 2){
                  if(!Number.isNaN(splitMsg[0])){
                    unit = Number.parseFloat(splitMsg[0])
                  }
                  coin = splitMsg[1].toUpperCase()
                }else if(splitMsg.length === 1){
                  coin = splitMsg[0].toUpperCase()
                }
                const dataUSD = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${coin}&convert=USD`,{headers: headersCoin})
                if(dataUSD.data.status.error_code === 0){
                  resp.push(lineUtility.symbol(coin, dataUSD.data.data[coin].name, dataUSD.data.data[coin].quote.USD.price, dataUSD.data.data[coin].quote.USD.price*thb, dataUSD.data.data[coin].quote.USD.percent_change_24h, unit))
                }else{
                  yahooFinanceOptions.params.symbols = `${coin}.bk`
                  const setBK = await axios.request(yahooFinanceOptions)
                  console.log("SET",setBK.data.quoteResponse.result[0].regularMarketPrice);


                  // resp.push(lineUtility.sticker('11537','52002751'))
                  // resp.push(lineUtility.message(`หมดโควต้าดูราคาเหรียญแล้ว รอเดือนหน้าเน้อ...`))
                }
              } catch (error) {
                console.log(error);
                resp.push(lineUtility.sticker('11537','52002744'))
                resp.push(lineUtility.message(`ยังไม่มีคำสั่งนี้ในระบบ กรุณาเลือกเมนูใหม่อีกครั้ง`))
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
      if(resp.length > 0){
        reply(replyToken,resp)
      }
    }else{
      reply(replyToken,cmuUtility.register)
    }
    res.send("HTTP POST request sent to the webhook URL!")
  }
}