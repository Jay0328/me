const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { resolve } = require('path');
const { markdownLanguage } = require('./public/config.js');


const BUILD_DIR = resolve(__dirname, 'public/build');
const APP_DIR = resolve(__dirname, 'public/src');
const CSS_DIR = resolve(__dirname, 'public/assets/css');

const basicConfig = {
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
}

const config = process.env.NODE_ENV !== 'production' ? merge(basicConfig, {
    devServer: {
        contentBase: BUILD_DIR,
        inline: true,
        port: 8080,
        watchOptions: {
            poll: true
        },
        watchContentBase: true
    },
    devtool: 'inline-source-map'
}) : merge(basicConfig, {
    devtool: "cheap-module-source-map",
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false // Suppress uglification warnings
            },
            output: {
                comments: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),  //Merge chunks
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0
        })
    ],
});

module.exports = config;