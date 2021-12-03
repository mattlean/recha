const { merge } = require('webpack-merge')
const { resolve } = require('path')
const {
  buildHTML,
  cleanOutput,
  compileBabel,
  injectCSS,
  setupDevServer,
} = require('ljas-webpack')
const { BUILD, SRC } = require('./paths')

module.exports = merge(
  {
    entry: SRC,

    output: {
      path: BUILD,
      filename: 'build.js',
    },

    mode: 'development',
  },

  compileBabel('ts+react'),

  buildHTML({
    title: 'Recha',
    template: resolve(SRC, 'template.html'),
  }),

  injectCSS(),

  setupDevServer({
    static: BUILD,
    port: 9001,
  }),

  cleanOutput()
)
