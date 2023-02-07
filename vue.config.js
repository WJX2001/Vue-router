const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // 配置可以解决调试时的跨域问题
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/api',
        ws: false,
        changeOrigin: true
      },
    }
  }
})