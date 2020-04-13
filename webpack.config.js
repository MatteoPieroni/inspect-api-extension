const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
const baseManifest = require('./manifest.js');
const pkg = require('./package.json');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'src/index.html'),
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },

  plugins: [
    HtmlWebpackPluginConfig,
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest,
        extend: {version: pkg.version}
      }
    })
  ],
};
