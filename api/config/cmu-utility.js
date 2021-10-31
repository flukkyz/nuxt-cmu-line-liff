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
          utility.message(data.leaveTypeName),
          {
            type: 'filler'
          },
          utility.message(`${utility.message(data.leaveLimit)} วัน`,{align: 'end'})
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
            uri: 'https://liff.line.me/1656332858-DgV6jA5l'
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
  }
}