const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

// 线上打包路径，请根据项目实际线上情况
const BASE_URL = process.env.NODE_ENV === 'production' ? './' : '/'
const Timestamp = new Date().getTime()
module.exports = {
  publicPath: BASE_URL, //指定部署应用包时的基本路径
  outputDir: 'dist', // 打包生成的生产环境构建文件的目录
  assetsDir: '', // 放置生成的静态资源路径，默认在outputDir
  indexPath: 'index.html', // 指定生成的 index.html 输入路径，默认outputDir
  pages: undefined, // 构建多页
  productionSourceMap: false, // 开启 生产环境的 source map?
  chainWebpack: config => {
    // 配置路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  // configureWebpack: {
  //   output: {
  //     filename: `[name].${Timestamp}.js`,
  //     chunkFilename: `[name].${Timestamp}.js`
  //   }
  // },
  // lintOnSave: true,
  css: {
    // loaderOptions: {
    //   postcss: {
    //     plugins: [
    //       require('postcss-plugin-px2rem')({
    //         rootValue: 35, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
    //         // unitPrecision: 5, //允许REM单位增长到的十进制数字。
    //         //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
    //         propBlackList: [], //黑名单
    //         exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
    //         selectorBlackList: ['.van'], //要忽略并保留为px的选择器
    //         // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
    //         // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
    //         mediaQuery: false //（布尔值）允许在媒体查询中转换px。
    //         // minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
    //       })
    //     ]
    //   }
    // }
    // requireModuleExtension: false, // 启用 CSS modules
    // extract: true, // 是否使用css分离插件
    // sourceMap: false, // 开启 CSS source maps?
    // loaderOptions: {
    //   plugins: [
    //     require('postcss-px2rem')({
    //       remUnit: 192
    //     })
    //   ]
    // } // css预设器配置项
  },
  devServer: {
    // host: '192.168.1.64:8081',
    port: 8081, // 端口
    // proxy: "http://localhost:63258/api"
    proxy: {
      "/api/pt": {
        target: "https://api2.debteehelper.com",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "/api/pt": "/api/"
        }
      },
      "/api/hd": {
        target: "http://api1.debteehelper.com",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "/api/hd": "/api/"
        }
      },
      "/api/zf": {
        target: "https://pay.debteehelper.com",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "/api/zf": "/api/"
        }
      }
    }
  }
}
