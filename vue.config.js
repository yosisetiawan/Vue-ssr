// const merge = require('lodash.merge');
// const path = require('path');
// const nodeExternals = require('webpack-node-externals');
// const base = require('@vue/cli-service/webpack.config')
// delete base.optimization;
// const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
// const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

// const isServer = process.env.WEBPACK_TARGET === 'node';

// module.exports = merge(base,{
//     outputDir: path.join(__dirname, isServer ? './.bundle' : './dist'),
//     configureWebpack: () => ({
//         entry: `./src/entry-${ isServer ? 'server' : 'client' }.js`,
//         target: isServer ? 'node' : 'web',
//         node: isServer ? undefined : false,
//         devtool: 'source-map',
//         plugins: [
//             isServer ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
//         ],
//         optimization: {
//             splitChunks: TARGET_NODE ? false : undefined 
//         },
//         externals: isServer ? nodeExternals({ whitelist: /\.css$/ }) : undefined,
//         output: {
//             libraryTarget: isServer ? 'commonjs2' : undefined
//         }
//     }),
//     chainWebpack: config => {
//         config.module
//         .rule('vue')
//         .use('vue-loader')
//         .tap(options => {
//             merge(options, {
//                 optimizeSSR: false
//             })
//         })

//         if(process.env.NODE_ENV === 'production'){
//             config.optimization.delete('splitChunks')
//         }

//         config.plugins
//             .delete('split-vendor')
//             .delete('split-vendor-async')
//             .delete('split-manifest')
//             .delete('inline-manifest')

//     },
//     productionSourceMap: false,
// })

const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

// 优化相关
const nodeExternals = require('webpack-node-externals')
// 合并相关
const merge = require('lodash.merge')

// 环境变量：决定入口是客户端还是服务端
const TARGET_NODE = process.env.WEBPACK_TARGET === "node"
const target = TARGET_NODE? "server": "client"

module.exports = {

    css: {
        extract: false
    },

    // outputDir: './dist/'+target,

    configureWebpack: ()=>({
        entry: `./src/entry-${target}.js`,
        devtool: 'source-map',
        target: TARGET_NODE? 'node' : 'web',
        node: TARGET_NODE? undefined : false,
        output: {
            libraryTarget: TARGET_NODE ? "commonjs2" : undefined
        },
        externals: TARGET_NODE
            ? nodeExternals({
                whitelist: [/\.css$/]
            })
            : undefined,
        optimization: {
            splitChunks: TARGET_NODE ? false : undefined 
        },
        plugins: [TARGET_NODE? new VueSSRServerPlugin(): new VueSSRClientPlugin()]
    }),

    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                merge(options, {
                    optimizeSSR: false
                })
            })
    }
}