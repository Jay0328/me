const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { resolve } = require('path');
const { markdownLanguage } = require('./public/config.js');

const BUILD_DIR = resolve(__dirname, 'public/build');
const APP_DIR = resolve(__dirname, 'public/src');

module.exports = {
  entry: {
    app: ['babel-polyfill', `${APP_DIR}/index.jsx`],
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$|\.js$/,
        include: APP_DIR,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin([BUILD_DIR]),
    new webpack.ContextReplacementPlugin(
      /highlight\.js\/lib\/languages$/,
      new RegExp(`^./(${markdownLanguage.join('|')})$`)
    )
  ]
};