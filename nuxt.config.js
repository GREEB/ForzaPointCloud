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
  axios: {
    baseURL: 'http://192.168.0.42:3000'
  },
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token'
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          refresh: { url: '/api/auth/refresh-token', method: 'post' },
          logout: false, //  we don't have an endpoint for our logout in our API and we just remove the token from localstorage
          user: { url: '/api/auth/user', method: 'get' }
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000
  },
  publicRuntimeConfig: {
    socketPort: process.env.IOPORT || 3001,
    url: process.env.URL || 'http://localhost' + this.port

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
    '@nuxtjs/auth-next',
    'nuxt-socket-io'
  ],
  io: {
    sockets: [
      {
        name: 'main',
        url: 'http://192.168.0.42:3001',
        default: true,
        vuex: {
          actions: [
            'connect --> CONNECT',
            'disconnect --> DISCONNECT',
            'registerUdp --> UDPREGISTER'
          ],
          emitBacks: [
            'sockets/game'
          ]
        }
      }
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
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
    color: 'black',
    height: '3px'
  },
  serverMiddleware: [
    // { path: '/auth', handler: '~/middleware/auth' },
    { path: '/', handler: '~/server/server.js' }
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
