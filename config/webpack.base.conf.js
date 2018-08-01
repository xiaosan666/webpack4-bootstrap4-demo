const webpack = require('webpack');
let glob = require("glob");
const dirJSON = require('../src/views/views.json');
const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let entry = {};
let plugins = [];
dirJSON.map(page => {
    entry[page.url] = path.resolve(__dirname, `../src/views/${page.url}/index.js`);
    plugins.push(
        new htmlPlugin({
            title: page.title,
            filename: path.resolve(__dirname, `../dist/${page.url}.html`),
            template: path.resolve(__dirname, `../src/views/${page.url}/index.html`),
            chunks: ['commons', page.url],
            hash: true,
            minify: false,
            xhtml: true,
        })
    );
});
plugins.push(new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
    root: path.resolve(__dirname, '../'),
    verbose: false
}));
plugins.push(new MiniCssExtractPlugin({
    filename: "[name].[hash:8].min.css",//static/css/
    chunkFilename: "css/[id].chunk.min.css",
}));
plugins.push(new webpack.ProvidePlugin({
    "$": "jquery",
    "jQuery": "jquery",
    "window.jQuery": "jquery"
}));

module.exports = {
    //入口文件的配置项
    entry: entry,
    //出口文件的配置项
    output: {
        publicPath: "",
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name].[hash:8].min.js',
        chunkFilename: 'js/[id].chunk.min.js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module: {
        rules: [
            {test: /\.(html|htm)$/, use: [{loader: 'html-withimg-loader',}]},
            /* {
                 test: /\.(scss)$/,
                 use: [{loader: 'style-loader'}, {loader: 'style-loader'}, {
                     loader: 'postcss-loader',
                     options: {
                         plugins: function () {
                             return [require('autoprefixer')];
                         }
                     }
                 }, {loader: 'sass-loader'}]
             },*/
            {
                test: /\.(png|jpg|jpe?g|gif|svg)$/,
                use: 'url-loader?limit=8192&name=[name].[ext]&outputPath=static/img/',//&outputPath=static/img/&publicPath=../img/
            },
             {
                 test: /\.(scss|css)$/,
                 use: ['style-loader', 'css-loader', 'sass-loader']
             },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    "css-loader", 'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env'],
                        plugins: ['transform-runtime']
                    }
                }
            },
            {test: /\.ejs$/, loader: 'ejs-loader?variable=data'}]
    },
    //插件，用于生产模版和各项功能
    plugins: plugins
};
