const path = require('path')
const fs = require('fs')

let th = {}
let en = {}
fs.readdirSync(path.join(__dirname, '/../locales/th')).forEach((file) => {
  const locales = require(path.join(__dirname, '/../locales/th', file))
  th = {
    ...th,
    ...locales
  }
})
fs.readdirSync(path.join(__dirname, '/../locales/en')).forEach((file) => {
  const locales = require(path.join(__dirname, '/../locales/en', file))
  en = {
    ...en,
    ...locales
  }
})

export default {
  defaultLocale: 'th',
  seo: true,
  detectBrowserLanguage: false,
  locales: [{
    code: 'th',
    name: 'ไทย',
    subName: 'Thai',
    iso: 'th-TH'
  },
  {
    code: 'en',
    name: 'English',
    subName: 'อังกฤษ',
    iso: 'en-US'
  }
  ],
  vueI18n: {
    locale: 'th',
    fallbackLocale: 'th',
    messages: {
      th,
      en
    }
  }
}
