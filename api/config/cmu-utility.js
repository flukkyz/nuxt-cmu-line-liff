const _ = require('lodash')
const utility = require('./line-utility')
module.exports = {
  register: [
      {
      type: 'template',
      altText: 'Register',
      template: {
          type: 'buttons',
          thumbnailImageUrl: `${process.env.BASE_URL}/images/logo.png`,
          imageAspectRatio: 'rectangle',
          imageSize: 'cover',
          imageBackgroundColor: '#FFFFFF',
          title: 'ลงทะเบียนเข้าใช้งาน',
          text: 'กรุณาลงทะเบียนก่อนการเข้าใช้งานในครั้งแรก',
          actions: [
            {
                type: 'uri',
                label: 'ลงทะเบียน',
                uri: `https://liff.line.me/${process.env.LIFF_ID}/profile`
            },
          ]
      }
    }
  ],
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
                    utility.span(new Intl.NumberFormat('th-th').format(salary),{
                      size: '3xl'
                    }),
                    utility.span(' บาท',{
                      size: 'xl'
                    })
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
        utility.message('FAQ',{
          weight: 'bold',
          align: 'center',
          size: 'xxl'
        })
      ]
    },
    {
      type: 'box',
      layout: 'vertical',
      alignItems: 'center',
      justifyContent: 'center',
      contents: [
        utility.message('คำถามที่พบบ่อย',{
          weight: 'bold'
        })
      ]
    },
    {
      type: 'box',
      layout: 'vertical',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '10px',
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
            utility.buttonPostback(data.title,`action=faq&id=${data._id}&title=${data.title}`, data.title)
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
  faqPostback: (data) => {
    const contents = []
    for (const faq of data.faqs) {
      contents.push({
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                utility.message('Question',{
                  weight: 'bold',
                  size: 'xl',
                  color: '#0000ff'
                }),
                utility.message(faq.question,{
                  wrap: true,
                  size: 'xl'
                })
              ]
            },
            {
              type: 'box',
              layout: 'vertical',
              paddingTop: '15px',
              contents: [
                utility.message('Answer',{
                  weight: 'bold',
                  color: '#0000ff'
                }),
                utility.message(faq.answer,{
                  wrap: true
                })
              ]
            },
          ]
        }
      })
    }
    return {
      type: 'flex',
      altText: `FAQ: ${data.title}`,
      contents: {
        type: 'carousel',
        contents
      }
    }
  },
}