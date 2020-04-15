'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/runtime-dom.cjs.prod.js')
} else {
  console.log('liuchengyuan')
  module.exports = require('./dist/runtime-dom.cjs.js')
}
