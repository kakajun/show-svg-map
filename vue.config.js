const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  publicPath: './',
  devServer: {
    proxy: {
      '/mapJson': {
        target: 'http://114.55.91.77:9880/',
        pathRewrite: { '^/mapJson': '/mapJson' },
        changeOrigin: true,
        secure: false
      }
    }
  }
})
