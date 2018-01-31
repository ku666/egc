'use strict'
// Template version: 1.2.0
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/demo': {
        target: 'http://172.16.30.46:8082/'
      },
      '/egcmapanalysis': {
      // '/egc-mapanalysiscomponent': {
        // target: 'http://172.16.30.73:8082/' //
        target: 'http://192.168.0.186:9033/' //
      },
      '/profile': {
        target: 'http://192.168.0.186:9030', // 业主画像
        changeOrigin: true
      },
      // '/egc-smartcommunitymgmtapp': {
      '/mapAnalysis': {
        // target: 'http://172.16.30.64:8082',// 地图分析
        target: 'http://192.168.0.186:9030',
        changeOrigin: true
      },
      '/device': {
        target: 'http://192.168.0.186:9030/', // 设备报表
        changeOrigin: true
       },
      "/egc-mdmmgmtapp": {
        target: 'http://127.0.0.1:9040/'
      },
      //更新升级模块接口
       "/egc-applicationupgradecomponent": {
         target: 'http://172.16.30.147:8080/',  // 赵石凤(更新升级)
         changeOrigin: true
       },
      //  "/egc-applicationupgradecomponent": {
      //   target: 'http://172.16.30.98:8081/',  // 孙飞翔(更新升级)
      //   changeOrigin: true
      // },
       "/egc-mdmcomponent": {
        target: 'http://172.16.30.67:8083/',  // 朱秀红(省市区数据)
        changeOrigin: true
      },
      '/scp-usermgmtcomponent': {
        target: 'http://192.168.0.242:30940',  // 242线上用户管理
        changeOrigin: true
      },
      // '/egc-applicationupgradecomponent': {
      //   target: 'http://172.16.30.112:8080',  // 李世杰
      //   changeOrigin: true
      // },
      '/egc-logservicecomponent': {
        target: 'http://172.16.30.9:8082/',  // 日志组件管理
        changeOrigin: true
      }
      
    },
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * SourceMap
     */
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
