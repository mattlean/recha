const { resolve } = require('path')

const ROOT = resolve(__dirname, '..')

exports.BUILD = resolve(ROOT, 'build')

exports.SRC = resolve(ROOT, 'src')
