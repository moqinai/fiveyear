const path = require('path')
console.log(__dirname)

module.exports = {
  // publicPath: '/static/build/',
  // outputDir: path.resolve(__dirname, '../public'),
  // outputDir: 'F:/gitBendi/px_jvhe/public',
  // assetsDir: 'static/build',
  // indexPath: 'fiveyear/index.html',

  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        // 修改它的选项...
        options.limit = 10000
        return options
      })
  },
  css: {
    // loaderOptions: {
    //   sass: {
    //     data: `@import "~@/assets/styles/import.scss"`
    //   }
    // }
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        // data: `@import "~@/assets/styles/import.scss";`
      }
    }
  },
  devServer: {
    // host: 'test.jjj.pxjy.com',
    // port: 80
    proxy: {
      '/wx': {
        target: 'http://test.jvhe.pxjy.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/wx': '/wx'
        }
      }
    }
    // '/captcha.html': {
    //   target: 'http://test.superkid.pxjy.com/',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/': '/'
    //   }
    // },
    // '/user/unifiedlogin/logout': {
    //   target: 'http://test.superkid.pxjy.com/',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/': '/'
    //   }
    // },
    // '/user/unifiedlogin/login': {
    //   target: 'http://test.superkid.pxjy.com/',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/': '/'
    //   }
    // },
    // '/upload': {
    //   target: 'http://test.superkid.pxjy.com/',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/upload': '/upload'
    //   }
    // }

    // }
  }
  // .rule('images')
  // .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
  // .use('url-loader')
  //   .loader('url-loader')
  //   .options(genUrlLoaderOptions('img'))
}
