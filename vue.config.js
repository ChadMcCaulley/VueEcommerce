module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '^/': {
        target: 'localhost:8000',
        ws: true,
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Rotten Tomatoes'
        return args
      })
  }
}
