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
        utility.message('คำถามที่พบบ่อย')
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
              layout: 'baseline',
              contents: [
                {
                  type: 'text',
                  contents: [
                    utility.span('Q: ',{
                      weight: 'bold',
                      size: 'xl'
                    }),
                    utility.span(faq.question,{
                      weight: 'bold',
                      size: 'xl'
                    }),
                  ]
                }
              ]
            },
            {
              type: 'box',
              layout: 'baseline',
              contents: [
                {
                  type: 'text',
                  contents: [
                    utility.span('A: ',{
                      weight: 'bold',
                      size: 'xl'
                    }),
                    utility.span(faq.answer,{
                      weight: 'bold',
                      size: 'xl'
                    }),
                  ]
                }
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