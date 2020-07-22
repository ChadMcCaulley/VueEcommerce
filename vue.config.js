module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: 'localhost',
    proxy: {
      '^/api/': {
        target: 'http://localhost:8000',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api/': '/' }
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Ecom'
        return args
      })
  },
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/index.html',
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://portfolio-ecom.herokuapp.com/'),
          handler: 'networkFirst',
          options: {
            networkTimeoutSeconds: 20,
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ],
      skipWaiting: true
    }
  }
}
