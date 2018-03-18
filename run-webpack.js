const webpack = require('webpack');
const webpackConfig = require('./webpack.dev');

webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log('error')
    }
   console.log('Done...')
});