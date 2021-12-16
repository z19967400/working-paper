const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};

// 线上打包路径，请根据项目实际线上情况
const BASE_URL = process.env.NODE_ENV === "production" ? "./" : "/";
const Timestamp = new Date().getTime()
module.exports = {
  publicPath: BASE_URL, //指定部署应用包时的基本路径
  outputDir: "dist", // 打包生成的生产环境构建文件的目录
  assetsDir: "", // 放置生成的静态资源路径，默认在outputDir
  indexPath: "index.html", // 指定生成的 index.html 输入路径，默认outputDir
  pages: undefined, // 构建多页
  productionSourceMap: false, // 开启 生产环境的 source map?
  chainWebpack: config => {
    // 配置路径别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("_c", resolve("src/components"));
  },
  configureWebpack: {
    output: {
      filename: `[name].${Timestamp}.js`,
      chunkFilename: `[name].${Timestamp}.js`
    }
  },

  css: {
    // requireModuleExtension: false, // 启用 CSS modules
    // extract: true, // 是否使用css分离插件
    // sourceMap: false, // 开启 CSS source maps?
    // loaderOptions: {
    //   // 导入scss变量
    //   scss: {
    //     //  prependData: `@import "@/assets/variable.scss";`
    //   },
    //   postcss: {
    //     plugins: {
    //       autoprefixer: {},
    //       "postcss-px2rem": {
    //         remUnit: 75 //转换为rem的基准px
    //         //其他配置选项自行查文档
    //       }
    //     }
    //   }
    // } 
    // css预设器配置项
  },
  devServer: {
    // host: "192.168.1.64:8082",
    port: 8082, // 端口
    // proxy: "https://www.zzbang.vip/"
    // proxy: "http://api2.zhaizhubang.net/api",
    proxy: {
      "/api/pt": {
        target: "https://api2.debteehelper.com",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "/api/pt": "/api/"
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
};
