const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const common = require('./webpack.config');

module.exports = merge(common, {
  mode: 'production',

  entry: {
    index: './src/index.tsx',
    background: './src/background/background.ts',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },

  optimization: {
    namedChunks: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor'
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body',
      excludeChunks: ['background'] })
  ]
})