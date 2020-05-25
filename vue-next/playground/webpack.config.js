const webpack = require('webpack')
const WebapckDevServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs')


const compiler = webpack({
    mode: 'development',
    devtool: 'source-map',
    entry: {
        app: './main.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    performance: {
        hints: false
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            vue: path.resolve(__dirname, '../packages/vue/dist/vue.esm.js'),
            // '@vue/compiler-core': path.resolve(__dirname, '../packages/compiler-core/src/index.ts'),
            // '@vue/compiler-dom': path.resolve(__dirname, '../packages/compiler-dom/src/index.ts'),
            // '@vue/runtime-core': path.resolve(__dirname, '../packages/runtime-core/src/index.ts'),
            // '@vue/runtime-dom': path.resolve(__dirname, '../packages/runtime-dom/src/index.ts')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: 'body',
            chunks: 'all' // []
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader',
                    {
                        loader: path.resolve(__dirname, 'emitloader.js')                    }
                ]
            }
        ]
    }
})

// 自定义文件输出系统
compiler.outputFileSystem = fs

const devServerOption = {
    port: 9000,
    contentBase: path.join(__dirname, "dist"), // 定义静态资源所在的本地目录
    filename: '[name].js',
    hot: true,
    // publicPath: '/static/' // 设置publicPath后， 路径加上static也能访问到静态资源, 这里会做代理
}

const server = new WebapckDevServer(compiler, devServerOption)

server.listen(devServerOption.port, () => {
    console.log('dev server')
})



