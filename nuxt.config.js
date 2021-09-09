import colors from 'vuetify/es5/util/colors'
import auth from './config/auth'

export default {

  ssr: false,
  loading: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      class: 'notranslate',
      translate: 'no'
    },
    titleTemplate: '%s - CMU Line',
    title: 'CMU Line',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'msapplication-TileColor', content: '#FFFFFF' },
      { name: 'msapplication-TileImage', content: '/icons/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#FFFFFF' },
      { name: 'google', value: 'notranslate' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/icons/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/icons/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/icons/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/icons/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/icons/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/icons/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/icons/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/icons/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '36x36', href: '/icons/android-icon-36x36.png' },
      { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/icons/android-icon-48x48.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '70x70', href: '/icons/ms-icon-70x70.png' },
      { rel: 'icon', type: 'image/png', sizes: '150x150', href: '/icons/ms-icon-150x150.png' },
      { rel: 'icon', type: 'image/png', sizes: '310x310', href: '/icons/ms-icon-310x310.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icons/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' }
    ],
    script: [
      { src: 'https://static.line-scdn.net/liff/edge/2.1/sdk.js', charset: 'utf-8' }
    ]
  },

  serverMiddleware: [
    '~/api/oauth2'
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-free/css/all.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '~/plugins/liff.js',
    '~/plugins/lodash.js',
    '~/plugins/head-util.js',
    '~/plugins/helpers.js',
    '~/plugins/breadcrumbs.js',
    '~/plugins/notifier.js',
    '~/plugins/overlay.js',
    '~/plugins/event-bus.js',
    '~/plugins/v-mask.js',
    '~/plugins/thai-bath-text.js',
    '~/plugins/v-uppercase.js',
    '~/plugins/base64-to-blob.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    ['@nuxtjs/vuetify', { treeShake: true }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    // '@nuxtjs/pwa',
    '@nuxtjs/dayjs',
    ['v-currency-field/nuxt-treeshaking', {
      locale: 'th-TH',
      // decimalLength: 2,
      autoDecimalMode: true,
      min: null,
      max: null,
      defaultValue: null,
      valueAsInteger: false,
      allowNegative: true
    }]
    // https://go.nuxtjs.dev/pwa
  ],

  dayjs: {
    locales: ['en', 'th'],
    defaultLocale: 'th',
    defaultTimeZone: 'Asia/Bangkok',
    plugins: [
      'utc',
      'timezone',
      'buddhistEra',
      'localeData'
    ]
  },

  auth,

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        // light: {
        //   topbar: '#FFFFFF',
        //   sidebar: '#FFFFFF',
        //   primary: '#713279',
        //   accent: '#082141',
        //   secondary: '#f36c28',
        //   third: '#eb9421',
        //   info: '#5f7cbd',
        //   warning: '#fcb123',
        //   error: '#c54b4b',
        //   success: '#4ebb57',
        //   dark: '#3a3a3c',
        //   light: '#f3f3f4'
        // },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    //   cache: true,
    //   hardSource: true
  },

  env: {
    appName: process.env.APP_NAME || 'CMU_Line',

    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    apiDirectory: process.env.API_DIR || '/api/',

    metaDefaultLang: process.env.META_DEFAULT_LANG || '',
    metaDefaultTitle: process.env.META_DEFAULT_TITLE || '',
    metaDefaultDescription: process.env.META_DEFAULT_DESCRIPTION || '',
    metaDefaultKeywords: process.env.META_DEFAULT_KEYWORDS || '',
    metaDefaultUrl: process.env.META_DEFAULT_URL || '',
    metaDefaultSiteName: process.env.META_DEFAULT_SITE_NAME || '',
    metaDefaultImage: process.env.META_DEFAULT_IMAGE || '',

    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '',

    LiffID: process.env.LIFF_ID || ''
  }
}
