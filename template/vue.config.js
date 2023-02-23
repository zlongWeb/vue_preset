const path = require('path');
const resolve = (dir) => {
  return path.join(__dirname, './', dir);
};
module.exports = {
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  productionSourceMap: false,
  devServer: {
    // 解决Invalid header
    allowedHosts: 'all',
    // proxy: {
    //   '/api': {
    //     target: '<url>',
    //     ws: true,
    //     changeOrigin: true
    //   },
    //   '/foo': {
    //     target: '<other_url>'
    //   }
    // }
  },
  configureWebpack: () => ({
    resolve: {
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets'),
        '@style': resolve('src/assets/style'),
        '@js': resolve('src/assets/js'),
        '@components': resolve('src/components'),
        '@mixins': resolve('src/mixins'),
        '@filters': resolve('src/filters'),
        '@store': resolve('src/store'),
        '@views': resolve('src/views'),
      }
    },
  }),
  chainWebpack: config => {
    
    // 避免asset重复
    config.module.rule('images').type('javascript/auto')
    config.module.rule('media').type('javascript/auto')
    config.module.rule('fonts').type('javascript/auto')
    config
      .module
      .rule('images')
      .test(/\.(jpg|png|gif)$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10,
        // 根据环境使用cdn或相对路径
        publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_CDN + 'img/' : process.env.VUE_APP_PUBLIC_PATH + '/img',
        // 将图片打包到dist/img文件夹下, 不配置则打包到dist文件夹下
        outputPath: 'img',
        esModule: false,
        // 配置打包后图片文件名 name指的是文件的名字 ext是文件的后缀
        name: '[name].[ext]'
      })
      .end()
    config
      .module
      .rule('media')
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: false,
        publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_CDN + 'media/' : process.env.VUE_APP_PUBLIC_PATH + '/media',
        outputPath: 'media',
        esModule: false,
        name: '[name].[ext]'
      })
      .end()

    config
      .module
      .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: false,
        publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_CDN + 'font/' : process.env.VUE_APP_PUBLIC_PATH + '/font',

        outputPath: 'font',
        esModule: false,
        name: '[name].[ext]'
      })
      .end()
  }
}
