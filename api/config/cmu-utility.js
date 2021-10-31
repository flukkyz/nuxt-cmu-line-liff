const _ = require('lodash')
const utility = require('./line-utility')
module.exports = {
  salary: (salary) => {
    return {
      type: 'flex',
      altText: 'เงินเดือนปัจจุบัน',
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
              contents: [
                utility.message('เงินเดือนปัจจุบัน')
              ]
            },
            {
              type: 'box',
              layout: 'vertical',
              paddingTop: '20px',
              paddingBottom: '30px',
              contents: [
                {
                  type: 'text',
                  weight: 'bold',
                  contents: [
                    {
                      type: 'span',
                      text: new Intl.NumberFormat('th-th').format(salary),
                      size: '3xl'
                    },
                    {
                      type: 'span',
                      text: ' บาท',
                      size: 'xl'
                    }
                  ]
                }
              ]
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                utility.buttonLink('แสดงรายละเอียดเพิ่มเติม','https://payroll.mis.cmu.ac.th/'),
              ]
            },
          ]
        }
      }
    }
  },
  leave: (datas) => {
    const contents = [{
      type: 'box',
      layout: 'vertical',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: '20px',
      contents: [
        utility.message('จำนวนวันลาที่เหลือ')
      ]
    }]
    for (const data of datas) {
      contents.push({
        type: 'box',
        layout: 'baseline',
        paddingStart: '30px',
        paddingEnd: '30px',
        contents: [
          utility.message(data.leaveTypeName,{wrap: true, flex: 4}),
          utility.message(`${data.leaveLimit} วัน`,{align: 'end', flex: 0})
        ]
      })
    }
    contents.push({
      type: 'box',
      layout: 'vertical',
      paddingTop: '30px',
      contents: [
        utility.buttonLink('แสดงรายละเอียดเพิ่มเติม','https://hr.mis.cmu.ac.th/')
      ]
    })
    return {
      type: 'flex',
      altText: 'การลา',
      contents: {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents
        }
      }
    }
  },
  faq: (datas) => {
    const contents = [{
      type: 'box',
      layout: 'baseline',
      paddingStart: '30px',
      paddingEnd: '30px',
      contents: [
        utility.message('เงินเดือนปัจจุบัน',{
          align: 'center',
          size: 'xxl'
        }),
      ]
    },
    {
      type: 'box',
      layout: 'vertical',
      alignItems: 'center',
      justifyContent: 'center',
      contents: [
        utility.message('คำถามที่พบบ่อย')
      ]
    },
    {
      type: 'box',
      layout: 'vertical',
      alignItems: 'center',
      justifyContent: 'center',
      contents: [
        utility.message('เลือกหัวข้อด้านล่างที่ต้องการ',{size: 'sm'})
      ]
    }]
    for (const data of datas) {
      if(data.faqs.length > 0){
        contents.push({
          type: 'box',
          layout: 'vertical',
          paddingTop: '5px',
          contents: [
            utility.buttonPostback(data.title,`action=faq&id=${data._id}`, data.title)
          ]
        })
      }
    }
    return {
      type: 'flex',
      altText: 'FAQ',
      contents: {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents
        }
      }
    }
  },
  faqPostback: (datas) => {
    const contents = []
    for (const data of datas) {
      contents.push({
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
                layout: 'baseline',
                paddingStart: '30px',
                paddingEnd: '30px',
                contents: [
                  {
                    type: 'text',
                    text: '1 รายการ',
                    warp: true,
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
      })
    }
    


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
}