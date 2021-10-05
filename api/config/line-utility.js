module.exports = {
  message: (message) => {
    return {
        "type": "text",
        "text": message
    }
  },
  image: () => {
    return {
        type: "image",
        originalContentUrl: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_2_restaurant.png",
        previewImageUrl: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_2_restaurant.png"
    }
  },
  uri: () => {
    return {
        type: "uri",
        label: "CLICK Link",
        uri: `https://15142daf4d14.ngrok.io`
    }
  },
  map: () => {
    return {
        type: "location",
        title: "LINE Company (Thailand) Limited",
        address: "127 อาคารเกษรทาวเวอร์ ชั้น17 ถ.ราชดำริ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
        latitude: 13.7460089,
        longitude: 100.5386192
    }
  },
  CarouselTemplate: () => {
    return {
        type: "template",
        altText: "This is a carousel template",
        template: {
            type: "carousel",
            imageAspectRatio: "rectangle",
            imageSize: "cover",
            columns: [
                {
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
            "items": [
                {
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
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "hello"
              },
              {
                "type": "text",
                "text": "world"
              }
            ]
          }
        }
      }
  },
  test2: () => {
      return {
        "type": "bubble",
        "header": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Header text"
            }
          ]
        },
        "hero": {
          "type": "image",
          "url": "https://example.com/flex/images/image.jpg"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Body text"
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Footer text"
            }
          ]
        },
        "styles": {
          "comment": "See the example of a bubble style object"
        }
      }
  }
}