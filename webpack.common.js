const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const { markdownLanguage } = require('./client/config.js');

const BUILD_DIR = resolve(__dirname, 'build');
const APP_DIR = resolve(__dirname, 'client/src');

module.exports = {
  entry: {
    react: ['react', 'react-dom', 'prop-types'],
    router: ['react-router-dom', 'history'],
    redux: ['redux', 'react-redux', 'redux-thunk', 'react-router-redux', 'immutable', 'redux-immutable'],
    jss: ['react-jss'],
    app: ['babel-polyfill', `${APP_DIR}/index.jsx`],
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[chunkhash].js',
    publicPath: '/'
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
    alias: {
      Config$: resolve(__dirname, 'client/config.js'),
      Actions: resolve(__dirname, 'client/src/actions'),
      Atoms: resolve(__dirname, 'client/src/components/atoms'),
      Molecules: resolve(__dirname, 'client/src/components/molecules'),
      Organisms: resolve(__dirname, 'client/src/components/organisms'),
      Layouts: resolve(__dirname, 'client/src/layouts'),
      Routes: resolve(__dirname, 'client/src/routes'),
      Theme: resolve(__dirname, 'client/src/theme'),
      Utils: resolve(__dirname, 'client/src/utils'),
    },
    extensions: ['.js', '.jsx']
  },
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        react: {
          test: 'react',
          name: 'react',
          chunks: 'initial',
          enforce: true
        },
        router: {
          test: 'router',
          name: 'router',
          chunks: 'initial',
          enforce: true
        },
        redux: {
          test: 'redux',
          name: 'redux',
          chunks: 'initial',
          enforce: true
        },
        jss: {
          test: 'jss',
          name: 'jss',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin([BUILD_DIR]),
    new webpack.ContextReplacementPlugin(
      /highlight\.js\/lib\/languages$/,
      new RegExp(`^./(${markdownLanguage.join('|')})$`)
    ),
    new HtmlWebpackPlugin({
      template: './client/index.html'
    })
  ]
};