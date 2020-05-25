module.exports = function emitloader(source) {
    console.log('emitloader')
    this.emitFile('emitfile.js', JSON.stringify({a:1}))
    return source
}