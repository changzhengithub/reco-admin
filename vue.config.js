const path = require("path");
// vue.config.js
module.exports = {
    // 选项...
    // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
    productionSourceMap: false,
  
    // devServer:{type:Object} 3个属性host,port,https
    // 它支持webPack-dev-server的所有选项
    // devServer: {
    //     host: 'xxx.xxx.xxx.xx', // 本机地址
    //     port: 8080, // 端口号
    //     https: false, // https:{type:Boolean}
    //     open: true, //配置自动启动浏览器
    //     // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    //     proxy: {
    //         '/api': {
    //             target: 'http://www.xxx.com/api', // 跨域地址
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/api': ''
    //             }
    //         }
    //     }
    // },

    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    // less vars，customize ant design theme
                    // 'primary-color': '#F5222D',
                },
                // DO NOT REMOVE THIS LINE
                javascriptEnabled: true,
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/assets/less/flex.less')]
        }
    }
}