const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        proxy: { // proxy URLs to backend development server
            '/pingdong-server': 'http://localhost:8080'
        },
    }
})