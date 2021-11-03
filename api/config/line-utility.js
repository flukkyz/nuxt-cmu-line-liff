const { add } = require('lodash')
const _ = require('lodash')

const addOptions = (obj,options) => {
  for (const [key, value] of Object.entries(options)) {
    obj[key] = value
  }
  return obj
}

module.exports = {
  message: (text, options = {}) => {
    const obj = {
      type: 'text',
      text
    }
    return addOptions(obj,options)
  },
  sticker: (packageId,stickerId) => {
    return {
      type: 'sticker',
      packageId,
      stickerId
    }
  },
  span: (text, options = {}) => {
    const obj = {
      type: 'span',
      text
    }
    return addOptions(obj,options)
  },
  image: (originalUrl,previewUrl = null, options = {}) => {
    const obj = {
      type: 'image',
      originalContentUrl: originalUrl,
      previewImageUrl: previewUrl || originalUrl
    }
    return addOptions(obj,options)
  },
  uri: (uri, label, options = {}) => {
    const obj = {
      type: "uri",
      label,
      uri
    }
    return addOptions(obj,options)
  },
  buttonLink: (label,uri,color = '#0000ff',height='sm',options={}) => {
    const obj = {
      type: 'button',
      action: {
        type: 'uri',
        label,
        uri
      },
      style: 'primary',
      color,
      height
    }
    return addOptions(obj,options)
  },
  buttonPostback: (label,data, text='' ,options={}) => {
    const obj = {
      type: 'button',
      action: {
          type: 'postback',
          label,
          data,
      },
      style: 'secondary'
    }
    if(!!text){
      obj.action.text = text
    }
    return addOptions(obj,options)
  },
  map: (title,address,latitude,longitude, options = {}) => {
    const obj = {
      type: 'location',
      title,
      address,
      latitude,
      longitude
    }
    return addOptions(obj,options)
  },
  CarouselTemplate: () => {
    return {
      type: "template",
      altText: "This is a carousel template",
      template: {
        type: "carousel",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        columns: [{
            thumbnailImageUrl: "https://vignette.wikia.nocookie.net/line/images/b/bb/2015-brown.png",
            imageBackgroundColor: "#000000",
            title: "Profile",
            text: "description",
            defaultAction: {
              type: "uri",
              label: "LINE",
              uri: `https://liff.line.me/1656332858-DgV6jA5l`
            },
            actions: [{
              type: "uri",
              label: "Index",
              uri: `https://liff.line.me/1656332858-DgV6jA5l`
            }]
          },
          {
            thumbnailImageUrl: "https://vignette.wikia.nocookie.net/line/images/1/10/2015-cony.png",
            imageBackgroundColor: "#000000",
            title: "this is menu",
            text: "description",
            defaultAction: {
              type: "uri",
              label: "LINE",
              uri: `https://liff.line.me/1656332858-DgV6jA5l/profile`
            },
            actions: [{
              type: "uri",
              label: "Profile",
              uri: `https://liff.line.me/1656332858-DgV6jA5l/profile`
            }]
          }
        ]
      }
    }
  },
  QuickReply: (id) => {
    return {
      "type": "text",
      "text": "Menu",
      "quickReply": {
        "items": [{
            "type": "action",
            "action": {
              "type": "uri",
              "label": "CLICK Link",
              "uri": `https://liff.line.me/1656332858-DgV6jA5l/apps`
            }
          },
          {
            "type": "action",
            "action": {
              "type": "cameraRoll",
              "label": "Camera Roll"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "camera",
              "label": "Camera"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "location",
              "label": "Location"
            }
          },
          {
            "type": "action",
            "imageUrl": "https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-1-512.png",
            "action": {
              "type": "message",
              "label": "Message",
              "text": "Hello World!"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "postback",
              "label": "Postback",
              "data": "action=buy&itemid=123",
              "displayText": "Buy"
            }
          },
          {
            "type": "action",
            "imageUrl": "https://icla.org/wp-content/uploads/2018/02/blue-calendar-icon.png",
            "action": {
              "type": "datetimepicker",
              "label": "Datetime Picker",
              "data": "storeId=12345",
              "mode": "datetime",
              "initial": "2018-08-10t00:00",
              "max": "2018-12-31t23:59",
              "min": "2018-08-01t00:00"
            }
          }
        ]
      }
    }
  },
  test1: () => {
    return {
      "type": "flex",
      "altText": "this is a flex message",
      "contents": {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "baseline",
          "contents": [
						{
              "type": "text",
              "text": "hello"
            },
						{
              "type": "text",
              "text": "hello"
            },
						{
              "type": "text",
              "text": "hello"
            }
          ]
        }
      }
    }
  },
  test2: () => {
    return {
      "type": "flex",
      "altText": "this is a flex message",
      "contents": {
        "type": "bubble",
        // "header": {
        //   "type": "box",
        //   "layout": "vertical",
        //   "contents": [{
        //     "type": "text",
        //     "text": "Header text"
        //   }]
        // },
        "hero": {
          "type": "image",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_2_restaurant.png"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [{
            "type": "text",
            "weight": "bold",
            "size": "3xl",
            // "wrap": true,
            // "gravity": "bottom",
            "contents": [
              {
                "type": "span",
                "text": "ลอยขึ้นแบบนี้นะ",
                "size": "xxl"
              }
            ]
            // "text": "ลอยขึ้นแบบนี้",
            // "size": "xxl"
          }]
        },
        // "footer": {
        //   "type": "box",
        //   "layout": "vertical",
        //   "contents": [{
        //     "type": "text",
        //     "text": "Footer text"
        //   }]
        // },
        "styles": {
          "header": {
            "backgroundColor": "#00ffff"
          },
          "hero": {
            "separator": true,
            "separatorColor": "#000000"
          },
          "footer": {
            "backgroundColor": "#00ffff",
            "separator": true,
            "separatorColor": "#000000"
          }
        }
      }
    }
  },
  symbol: (symbol,usd,thb) => {
    return {
      type: 'flex',
      altText: 'Cryptocurrency',
      contents: {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          alignItems: 'center',
          justifyContent: 'center',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              paddingTop: '20px',
              paddingBottom: '10px',
              contents: [
                {

                  type: 'text',
                  weight: 'bold',
                  size: '5xl',
                  text: symbol
                }
              ]
            },
            {
              type: 'box',
              layout: 'vertical',
              paddingBottom: '10px',
              contents: [
                {
                  type: 'text',
                  contents: [
                    {
                      type: 'span',
                      text: '$',
                      size: 'xl'
                    },
                    {
                      type: 'span',
                      text: new Intl.NumberFormat('th-th').format(usd),
                      weight: 'bold',
                      size: 'xxl'
                    }
                  ]
                }
              ]
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  contents: [
                    {
                      type: 'span',
                      text: 'ประมาณ ',
                      size: 'sm'
                    },
                    {
                      type: 'span',
                      weight: 'bold',
                      text: new Intl.NumberFormat('th-th').format(thb),
                    },
                    {
                      type: 'span',
                      text: ' บาท',
                      size: 'sm'
                    }
                  ]
                }
              ]
            },
            {
              type: 'box',
              layout: 'vertical',
              paddingBottom: '30px',
              contents: [
                {
                  type: 'text',
                  color: '#888888',
                  text: 'ค่าประมาณที่ 1 USD = 33 บาท',
                  size: 'xxs'
                }
              ]
            },
          ]
        }
      }
    }
  },
  leave: (data) => {
    
    return {
      type: 'flex',
      altText: 'การลา',
      contents: {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '20px',
              contents: [
                {
                  type: 'text',
                  text: 'จำนวนวันลาที่เหลือ'
                }
              ]
            },
            {
              type: 'box',
              layout: 'baseline',
              paddingStart: '30px',
              paddingEnd: '30px',
              contents: [
                {
                  type: 'text',
                  text: 'ลาป่วย'
                },
                {
                  type: 'filler'
                },
                {
                  type: 'text',
                  text: '1 วัน',
                  align: 'end'
                }
              ]
            },
            {
              type: 'box',
              layout: 'baseline',
              paddingStart: '30px',
              paddingEnd: '30px',
              contents: [
                {
                  type: 'text',
                  text: 'ลากิจ'
                },
                {
                  type: 'filler'
                },
                {
                  type: 'text',
                  text: '1 วัน',
                  align: 'end'
                }
              ]
            },
            {
              type: 'box',
              layout: 'baseline',
              paddingStart: '30px',
              paddingEnd: '30px',
              contents: [
                {
                  type: 'text',
                  text: 'ลาพักร้อน'
                },
                {
                  type: 'filler'
                },
                {
                  type: 'text',
                  text: '1 วัน',
                  align: 'end'
                }
              ]
            },
            {
              type: 'box',
              layout: 'vertical',
              paddingTop: '30px',
              contents: [
                {
                  type: 'button',
                  action: {
                    type: 'uri',
                    label: 'แสดงรายละเอียดเพิ่มเติม',
                    uri: 'https://liff.line.me/1656332858-DgV6jA5l'
                  },
                  style: 'primary',
                  color: '#0000ff',
                  height: 'sm'
                }
              ]
            },
          ]
        }
      }
    }
  },
  document: () => {
    return {
      type: 'flex',
      altText: 'CMU e-Document',
      contents: {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '20px',
              contents: [
                {
                  type: 'text',
                  text: 'หนังสือเข้าที่ยังไม่ได้อ่าน'
                }
              ]
            },
            {
              type: 'box',
              layout: 'baseline',
              paddingStart: '30px',
              paddingEnd: '30px',
              contents: [
                {
                  type: 'text',
                  text: '1 รายการ',
                  align: 'center',
                  size: 'xl'
                }
              ]
            },
            {
              type: 'box',
              layout: 'vertical',
              paddingTop: '30px',
              contents: [
                {
                  type: 'button',
                  action: {
                    type: 'uri',
                    label: 'แสดงรายละเอียดเพิ่มเติม',
                    uri: 'https://liff.line.me/1656332858-DgV6jA5l'
                  },
                  style: 'primary',
                  color: '#0000ff',
                  height: 'sm'
                }
              ]
            },
          ]
        }
      }
    }
  },
  test3: () => {
    return {
      "type": "flex",
      "altText": "this is a flex message",
      "contents": {
        "type": "carousel",
        "contents": [
          {
            "type": "bubble",
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "First bubble"
                }
              ]
            }
          },
          {
            "type": "bubble",
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "Second bubble"
                }
              ]
            }
          }
        ]
      }
    }
  },
  test4: () => {
    return {
      "type": "template",
      "altText": "This is a buttons template",
      "template": {
          "type": "buttons",
          "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
          "imageAspectRatio": "rectangle",
          "imageSize": "cover",
          "imageBackgroundColor": "#FFFFFF",
          "title": "Menu",
          "text": "Please select",
          "defaultAction": {
              "type": "uri",
              "label": "View detail",
              "uri": "http://example.com/page/123"
          },
          "actions": [
              {
                "type": "postback",
                "label": "Buy",
                "data": "action=buy&itemid=123"
              },
              {
                "type": "postback",
                "label": "Add to cart",
                "data": "action=add&itemid=123"
              },
              {
                "type": "uri",
                "label": "View detail",
                "uri": "http://example.com/page/123"
              }
          ]
      }
    }
  }
}
