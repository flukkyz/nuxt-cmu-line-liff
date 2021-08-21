export default ({ app }, inject) => {
  inject('lang', {
    isTh: () => {
      return app.i18n.locale === 'th'
    },
    isEn: () => {
      return app.i18n.locale === 'en'
    },
    getSIso: () => {
      return app.i18n.locale === 'th' ? 'th' : 'en'
    },
    getIso: () => {
      return app.i18n.locale === 'th' ? 'th-th' : 'en-us'
    },
    getISO: () => {
      return app.i18n.locale === 'th' ? 'th-TH' : 'en-US'
    }
  })
}
