const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.config');

module.exports = merge(common, {
  mode: 'development',

  entry: {
    index: './src/index.tsx',
    mockData: path.resolve(__dirname, 'localMock.js'),
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  devServer: {
    contentBase: './dist',
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },

})