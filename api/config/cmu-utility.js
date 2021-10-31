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
                {
                  type: 'text',
                  text: 'เงินเดือนปัจจุบัน'
                }
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
                {
                  type: 'button',
                  action: {
                    type: 'uri',
                    label: 'แสดงรายละเอียดเพิ่มเติม',
                    uri: 'https://payroll.mis.cmu.ac.th/'
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
  leave: (datas) => {
    const contents = [{
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
        {
          type: 'button',
          action: {
            type: 'uri',
            label: 'แสดงรายละเอียดเพิ่มเติม',
            uri: 'https://hr.mis.cmu.ac.th/'
          },
          style: 'primary',
          color: '#0000ff',
          height: 'sm'
        }
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
        {
          type: 'text',
          text: 'FAQ',
          align: 'center',
          size: 'xxl'
        }
      ]
    },
    {
      type: 'box',
      layout: 'vertical',
      alignItems: 'center',
      justifyContent: 'center',
      contents: [
        {
          type: 'text',
          text: 'เลือกหัวข้อด้านล่างที่ต้องการ'
        }
      ]
    }]
    for (const data of datas) {
      if(data.faqs.length > 0){
        contents.push({
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'button',
              action: {
                  type: "postback",
                  label: data.title,
                  data: `faq=${data._id}`,
                  text: data.title
              },
              style: 'secondary',
              color: '#0000ff'
            }
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
  }
}