const webpack = require('webpack');
const { resolve } = require('path');

const BUILD_DIR = resolve(__dirname, 'public/build');
const APP_DIR = resolve(__dirname, 'public/src');
const CSS_DIR = resolve(__dirname, 'public/assets/css');

const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
        warnings: false
    },
    output: {
        comments: false
    }
});

const config = {
    entry: [
        `${APP_DIR}/index.jsx`,
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$|\.js$/,
                include: APP_DIR,
                exclude: /node_modules/,
                enforce: 'pre',
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                include: CSS_DIR,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2)$/,
                loader: ["url-loader?prefix=font/&limit=5000"]
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: ["url-loader?limit=10000&mimetype=application/octet-stream"]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: ["url-loader?limit=10000&mimetype=image/svg+xml"]
            }
        ]
    },
    devServer: {
        inline: true,
        port: 8080,
        watchOptions: {
            poll: true
        },
        watchContentBase: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css']
    },
    devtool: "cheap-module-eval-source-map",
    plugins: [UglifyJsPluginConfig]
}

module.exports = config;