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
    workboxPluginMode: 'InjestManifest',
    workboxOptions: {
      swSrc: './src/service-worker.js'
    }
  }
}
