const webpack = require('webpack')
const path = require('path')
debugger
let compiler = webpack({
    entry: {
        app: path.resolve(__dirname, 'index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    }
})

compiler.run()