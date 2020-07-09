
const env = require('dotenv').config()

export default {
  env: env.parsed,
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'pt_AO',
    },
    title: 'Youbank Direct',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Youbank Direct',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: process.env.npm_package_description || ''
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.APP_URL
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: process.env.APP_URL + '/images/placeholder_image.png',
      },
      {
        hid: 'og::image:secure_url',
        property: 'og:image:secure_url',
        content: process.env.APP_URL + '/images/placeholder_image.png',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Youbank Direct',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: process.env.npm_package_description || ''
      },

      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: process.env.APP_URL + '/images/placeholder_image.png',
      },
      ////
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: "#0CB6E1",
      },
      {
        hid: 'msapplication-navbutton-color',
        name: 'msapplication-navbutton-color',
        content: "#0CB6E1",
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      {
        hid: 'apple-mobile-web-app-status-bar-style',
        name: 'apple-mobile-web-app-status-bar-style',
        content: "#0CB6E1",
      },
      {
        property: 'keywords',
        content: "Enviar dinheiro"
      },
      {
        property: 'og:locale',
        content: 'pt_AO'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:site_name',
        content: 'Youbank',
      },
      {
        property: 'article:publisher',
        content: 'https://www.facebook.com/youbank.ao',
      },
      {
        name: 'twitter:creator',
        content: "@youbank.ao",
      },
      {
        name: 'twitter:site',
        content: "@youbank.ao",
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href:
          "/css/bootstrap.min.css"
      },
      {
        rel: "stylesheet",
        href:
          "/css/style.css"
      },
      {
        rel: "stylesheet",
        href:
          "/css/floating-form-elements.css"
      },
      {
        rel: "stylesheet",
        href:
          "/css/icomoon.css"
      },
      {
        rel: "stylesheet",
        href:
          "/css/switch.css"
      }
    ],
    script: [
      {
        src: "/js/jquery.min.js",
        type: "text/javascript"
      },
      {
        src:
          "/js/popper.min.js",
        type: "text/javascript"
      },
      {
        src:
          "/js/bootstrap.min.js",
        type: "text/javascript"
      },
      {
        src:
          "/js/main.js",
        type: "text/javascript"
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#0CB6E1' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "@/plugins/directives.client.js",
    "@/plugins/loading.js",
    "@/plugins/mixins/user.js",
    "@/plugins/mixins/validation.js",
    "@/plugins/mixins/globalmethods.js",
    "@/plugins/axios.js",
    { src: '@/plugins/idle.js', ssr: false },

    {
      src: '@/plugins/perfect-scrollbar.js',
      ssr: false
    },
    {
      src: '@/plugins/ga.js',
      ssr: false
    },
    {
      src: '@/plugins/sweetalert.js',
      ssr: false
    },
    {
      src: '@/plugins/qrcode-reader.js',
      ssr: false
    },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/laravel-echo',
    '@nuxtjs/dotenv',
    ['vue-currency-input/nuxt', {
      globalOptions: {
        'allow-negative': false,
        'value-range': { min: 0.01, max: 99999999.99 },
        locale: "de-DE"
      }
    }]
  ],
  echo: {
    broadcaster: 'pusher',
    key: '80b3f61dbf472916abed',
    cluster: 'ap2',
    authEndpoint: `${process.env.API_HOST}/broadcasting/auth`,
    host: process.env.API_HOST,
    encrypted: true,
    authModule: true,
    connectOnLogin: true,
    disconnectOnLogout: true
  },
  router: {
    middleware: ["clearValidationErrors"]
  },
  axios: {
    //baseURL: `${process.env.API_URL}`
  },
  auth: {
    strategies: {
      local: {
        token: {
          maxAge: 1799,
          type: 'Bearer'
        },
        endpoints: {
          login: { url: '/direct/login', method: 'post', propertyName: 'access_token' },
          logout: { url: '/direct/logout', method: 'post' },
          user: { url: '/direct', method: 'get', propertyName: false }
        },
      },
    },
    redirect: false,
    // redirect: {
    //   login: '/auth/login',
    //   logout: '/auth/login',
    //   home: '/',
    //   // callback: '/auth/login'
    // },
    //rewriteRedirects: true,

  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
