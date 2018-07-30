const webpack = require('webpack');
let glob = require("glob");
const dirJSON = require('../src/package.json');
const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");

let entry = {}
dirJSON.map(page => {
    entry[page.url] = path.resolve(__dirname, `../src/views/${page.url}/index.js`)
})

let plugins = []
dirJSON.map(page => {
    plugins.push(
        new htmlPlugin({
            title: page.title,
            filename: path.resolve(__dirname, `../dist/${page.url}.html`),
            template: path.resolve(__dirname, `../src/views/${page.url}/index.ejs`),
            chunks: [page.url],
            hash: true,
            minify: false,
            xhtml: true,
        })
    )
})
plugins.push(new extractTextPlugin("./static/css/[chunkhash].css"))

module.exports = {
    //入口文件的配置项
    entry: entry,
    //出口文件的配置项
    output: {
        publicPath: "",
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name].[hash:8].min.js',
        chunkFilename: 'js/[id].chunk.min.js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module: {
        rules: [
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            },
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {importLoaders: 1}},
                        'postcss-loader'
                    ],
                    publicPath: "../../",
                })

            },
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        }, {
                            loader: "less-loader"
                        }, 'postcss-loader'
                    ],
                    publicPath: "../../"
                })
            },
            {
                test: /\.(png|jpg|jpge|gif|svg)/,
                use: [{
                    loader: 'file-loader?name=[hash:8].[name].[ext]',
                    options: {
                        outputPath: 'static/images/',
                    }
                }]
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?name=[hash:8].[name].[ext]",
                options: {
                    outputPath: 'static/fonts/',
                }
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "file-loader?name=[hash:8].[name].[ext]",
                options: {
                    outputPath: 'static/fonts/',
                }
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?name=[hash:8].[name].[ext]",
                options: {
                    outputPath: 'static/fonts/',
                }
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?name=[hash:8].[name].[ext]",
                options: {
                    outputPath: 'static/images/',
                }
            },
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader?variable=data'
            }
        ]
    },
    //插件，用于生产模版和各项功能
    plugins: plugins
}