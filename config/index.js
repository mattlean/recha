const {
  buildHTML,
  cleanOutput,
  compileBabel,
  copyFiles,
  injectCSS,
  setupDevServer,
} = require('ljas-webpack')
const { merge } = require('webpack-merge')
const { resolve } = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin')
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

  {
    plugins: [
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
    ],
  },

  compileBabel('ts+react'),

  buildHTML({
    title: 'Recha',
    template: resolve(SRC, 'template.html'),
  }),

  injectCSS(),

  copyFiles({
    patterns: [{ from: 'src/manifest.json', to: 'manifest.json' }],
  }),

  setupDevServer({
    static: BUILD,
    port: 9001,
  }),

  cleanOutput()
)
