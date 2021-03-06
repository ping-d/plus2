const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new UglifyJSPlugin()
    ],
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: "[name].[chunkhash].js"
    }
})