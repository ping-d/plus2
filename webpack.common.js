const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const entrys = require('./webpack.getEntrys');
module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: entrys.entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: "[name].js"
    },
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.p$/,
                exclude: /node_modules/,
                loader: [
                    path.resolve(__dirname, 'myLoader/loader2.js'),
                    path.resolve(__dirname, 'myLoader/p-loader.js')
                ]
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options:{
                            minimize:true,
                            sourceMap: false,
                        }
                    }, 'sass-loader'],

                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {}
                    },
                    {
                        loader: 'import-html',
                        options: {
                            a: 1
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),

        new ExtractTextPlugin({
            filename: "[name][contenthash].css"
        })
    ].concat(entrys.getHtmlWebpackPluginList(false)),
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    test: "vendor",
                    name: "vendor",
                    enforce: true
                }
            }
        }
    }
}