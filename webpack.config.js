var webpack = require('webpack');
var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => ({
    entry: {
        'app': [
            './source/app.js'
        ]
    },
    output: {
        path: __dirname + "/docs",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            },
            {
                test: /\.styl$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]

            }
        ]
    },
    plugins: env && env.prod ? [
        new UglifyJSPlugin()
    ] : [],
    devServer: {
        contentBase: './docs',
        host: '0.0.0.0',
        port: 8080
    },
    devtool: 'source-map'
});