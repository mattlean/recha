const glob = require('glob')
const merge = require('webpack-merge')

const parts = require('../common/parts')
const PATHS = require('../../PATHS')

module.exports = merge([
  {
    output: {
      filename: 'renderer.js',
      path: PATHS.build
    }
  },

  parts.cleanPaths(['build/production/webpack']),

  parts.loadHTML({
    template: `${PATHS.renderer.src}/index.html`,
    templateParameters: {
      csp: `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; connect-src http://localhost:1337; font-src https://fonts.gstatic.com; script-src 'self'; style-src 'self' 'unsafe-inline' blob: https://fonts.googleapis.com;">`
    }
  }),

  parts.minJS(),

  parts.minCSS({
    options: {
      discardComments: { removeAll: true },
      safe: true
    }
  }),

  parts.loadStyles(),

  // parts.extractStyles({
  //   filename: 'style.css',
  //   use: [
  //     {
  //       loader: 'css-loader',
  //       options: { sourceMap: true }
  //     },
  //     {
  //       loader: 'sass-loader',
  //       options: {
  //         includePaths: ['node_modules'],
  //         sourceMap: true
  //       }
  //     },
  //     parts.autoprefix()
  //   ]
  // }),

  parts.purifyCSS({ paths: glob.sync(`${PATHS.renderer.src}/**/*.{js,jsx}`, { nodir: true }) }),

  parts.setFreeVariable('__API__', 'http://localhost:1337/v1'),

  parts.genSourceMaps({ type: 'source-map' })
])
