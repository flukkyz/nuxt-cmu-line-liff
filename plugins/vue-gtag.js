import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: { id: process.env.googleAnalyticsId },
  appName: process.env.appName
})
