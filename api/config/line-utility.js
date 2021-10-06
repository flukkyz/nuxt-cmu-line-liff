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
  salary: (salary) => {
    return {
      type: 'flex',
      altText: "เงินเดือนปัจจุบันของคุณ",
      contents: [
        {
          type: 'bubble',
          body: {
            type: 'box',
            layout: 'vertical',
            alignItems: 'center',
            justifyContent: 'center',
            contents: [
              {
                type: 'text',
                text: 'เงินเดือนปัจจุบันของคุณ'
              }
              // {
              //   type: 'box',
              //   layout: 'vertical',
              //   contents: [
              //   ]
              // }
            ]
          }
        }
      ]
    }
    // return {
    //   "type": "flex",
    //   "altText": "เงินเดือนปัจจุบันของคุณ",
    //   "contents": {
    //     "type": "bubble",
    //     "body": {
    //       "type": "box",
    //       "layout": "vertical",
    //       "alignItems": "center",
    //       "justifyContent": "center",
    //       "contents": [
    //         {
    //           "type": "text",
    //           "text": "เงินเดือนปัจจุบันของคุณ"
    //         },
    //         {
    //           "type": "text",
    //           "weight": "bold",
    //           "contents": [
    //             {
    //               "type": "span",
    //               "text": new Intl.NumberFormat('th-th').format(salary),
    //               "size": "3xl"
    //             },
    //             {
    //               "type": "span",
    //               "text": ' บาท',
    //               "size": "xl"
    //             },
    //           ]
    //         },
    //         {
    //           "type": "button",
    //           "action": {
    //             "type": "uri",
    //             "label": "แสดงรายละเอียดเพิ่มเติม",
    //             "uri": "https://liff.line.me/1656332858-DgV6jA5l"
    //           },
    //           "style": "primary",
    //           "color": "#0000ff",
    //           offsetTop: '50px',
    //           "height": "sm"
    //         }
    //       ]
    //     }
    //   }
    // }
  },
  test3: () => {
    return {
      "type": "flex",
      "altText": "this is a flex message",
      "contents": {
        "type": "carousel",
        "contents": [{
            "type": "bubble",
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [{
                "type": "text",
                "text": "First bubble",
								"action": {
									"type": "message",
									"label": "Message",
									"text": "Hello World!"
								}
              }]
            }
          },
          {
            "type": "bubble",
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [{
                "type": "text",
                "text": "Second bubble",
								"action": {
									"type": "message",
									"label": "Message2",
									"text": "Hello World! 2"
								}
              }]
            }
          }
        ]
      }
    }
  }
}
