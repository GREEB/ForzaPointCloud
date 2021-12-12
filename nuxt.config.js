import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s ForzaPointCloud',
    title: '',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    middleware: ['auth']
  },
  auth: {
    strategies: {
      discord: {
        clientId: process.env.DISCORDID,
        clientSecret: process.env.DISCORDSECRET,
        grantType: 'authorization_code',
        codeChallengeMethod: '',
        scope: ['identify']
      }
    },
    redirect: {
      login: '/login',
      logout: '/auth',
      home: '/'
    }
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/main.sass'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/svg'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
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
  loading: {
    color: 'blue',
    height: '5px'
  },
  serverMiddleware: [
    // { path: '/auth', handler: '~/middleware/auth' },
    { path: '/', handler: '~/server/index.js' }
    // { path: '/udp', handler: '~/middleware/udp' },
    // { path: '/io', handler: '~/middleware/io' }

  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'three'
    ],
    loaders: {
      sass: {
        implementation: require('sass')
      },
      scss: {
        implementation: require('sass')
      }
    }
  }
}
