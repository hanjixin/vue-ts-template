// eslint-disable-next-line @typescript-eslint/no-var-requires
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const InlineSourcePlugin = require('./plugins/InlineSoucePlugins');
const isProduction = process.env.NODE_ENV === "production";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
function resolve(dir) {
  // 路径可能与你的项目不同
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require("os").cpus().length > 1,
  // 所有 webpack-dev-server 的选项都支持
  devServer: {
    port: 8080, // 配置端口
    open: true, // 自动开启浏览器
    compress: true, // 开启压缩
    // 设置让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: false,
      errors: true
    },
    // 设置请求代理
    proxy: {
      "/api": {
        target: "<url>",
        ws: true,
        changeOrigin: true
      },
      "/foo": {
        target: "<other_url>"
      }
    }
  },
  chainWebpack: config => {
    // 引入babel-polyfill
    config
      .entry("index")
      .add("babel-polyfill")
      .end();
    config.module.rule("svg").uses.clear();
    config.module
      .rule("svg1")
      .test(/\.svg$/)
      .use("svg-sprite")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end()
      .include.add(resolve("src/icons"))
      .end();
    // 添加文件路径别名
    // config.resolve.alias.set("@", resolve("src"));
    // if (isProduction) {
    //   // 生产环境注入cdn
    //   config.plugin('html')
    //     .tap(args => {
    //       args[0].cdn = cdn;
    //       return args;
    //     });
    // }
    // console.log(Object.values(config.module.rules)[1])
  },
  configureWebpack: config => {
    config.performance = {
      hints: false
    };
    if (isProduction) {
      // 为生产环境修改配置...
      config.plugins.push(
        //添加代码压缩工具，及设置生产环境自动删除console
        new UglifyJsPlugin({
          warningsFilter: (warning, source) => {
            if (/Dropping unreachable code/i.test(warning)) {
              return true;
            }

            if (/filename\.js/i.test(source)) {
              return true;
            }

            return false;
          },
          sourceMap: false,
          parallel: true
        })
      );
    } else {
      // 为开发环境修改配置...
    }
  }
};
