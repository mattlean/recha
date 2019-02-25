const merge = require('webpack-merge')

const parts = require('../common/parts')
const PATHS = require('../../PATHS').renderer

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 8080

module.exports = merge([
  {
    output: {
      filename: 'renderer.js',
      path: PATHS.build
    }
  },

  parts.cleanPaths(['build/development/renderer']),

  parts.setupDevServer({
    host: HOST,
    port: PORT,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9001',
        pathRewrite: { '^/api': '' }
      }
    }
  }),

  parts.loadHTML({
    template: `${PATHS.src}/index.html`,
    templateParameters: {
      csp: ''
    }
  }),

  parts.loadStyles(),

  parts.setFreeVariable('__API__', '/api/v1'),

  parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
])
