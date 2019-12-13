const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = function(args = {}) {
  let isBuild = args.target === 'production'
  let config = {
    mode: 'development',//isBuild?'production':'development',
    devtool: isBuild?'source-map':'inline-source-map',
    /**
     {
      chat: [
        'webpack-hot-middleware/client',
        'E:\\github\\learn\\vuex\\examples\\chat\\app.js'
      ],
      counter: [
        'webpack-hot-middleware/client',
        'E:\\github\\learn\\vuex\\examples\\counter\\app.js'
      ],
      'counter-hot': [
        'webpack-hot-middleware/client',
        'E:\\github\\learn\\vuex\\examples\\counter-hot\\app.js'
      ],
      'shopping-cart': [
        'webpack-hot-middleware/client',
        'E:\\github\\learn\\vuex\\examples\\shopping-cart\\app.js'
      ],
      todomvc: [
        'webpack-hot-middleware/client',
        'E:\\github\\learn\\vuex\\examples\\todomvc\\app.js'
      ]
    }
     */
    // 多个入口
    entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
      const fullDir = path.join(__dirname, dir)
      const entry = path.join(fullDir, 'app.js')
      if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
        entries[dir] = ['webpack-hot-middleware/client', entry]
      }
      return entries
    }, {}),
  
    output: {
      path: path.join(__dirname, '__build__'),
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
      publicPath: '/__build__/'
    },
  
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
        { test: /\.vue$/, use: ['vue-loader'] },
        { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] }
      ]
    },
  
    resolve: {
      alias: {
        vuex: path.resolve(__dirname, '../src/index.esm.js')
      }
    },
  
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'shared',
            filename: 'shared.js',
            chunks: 'initial'
          }
        }
      }
    },
  
    plugins: [
      new VueLoaderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  
  }
  console.log('entry', config.entry)
  return config
}
