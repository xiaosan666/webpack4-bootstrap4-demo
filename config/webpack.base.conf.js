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
    let chunks = ['vendors', 'easyui', 'default', page.url];
    if(page.excludeEasyui){
        chunks.splice(chunks.indexOf('easyui'),1)
    }
    plugins.push(
        new htmlPlugin({
            title: page.title,
            favicon: path.resolve(__dirname, `../src/assets/img/favicon.ico`),
            filename: path.resolve(__dirname, `../dist/${page.url}.html`),
            template: path.resolve(__dirname, `../src/views/${page.url}/index.html`),
            chunks: chunks,
            chunksSortMode: 'manual',
            hash: true,
            minify: false,
            xhtml: true
        })
    );
});
plugins.push(new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
    root: path.resolve(__dirname, '../'),
    verbose: false
}));
plugins.push(new MiniCssExtractPlugin({
    filename: "[name].min.css",//static/css/
    chunkFilename: "static/css/[id].chunk.min.css",
}));
plugins.push(new webpack.ProvidePlugin({
    "$": "jquery",
    "jQuery": "jquery",
    "window.jQuery": "jquery"
}));

module.exports = {
    entry: entry,
    output: {
        publicPath: "",
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name].[hash:8].min.js',
        chunkFilename: 'static/js/[id].chunk.min.js',
    },
    optimization: {
        splitChunks: {
            chunks: "initial",
            cacheGroups: {
                easyui: {
                    test: /[\\/]src[\\/]assets[\\/]libs[\\/]jquery-easyui[\\/]/,
                    priority: -5,
                    name: 'easyui'
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors'
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    name: 'default',
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [
            {test: /\.(html|htm)$/, use: [{loader: 'html-withimg-loader',}]},
            {
                test: /\.(png|jpg|jpe?g|gif|svg)$/,
                use: 'url-loader?limit=8192&name=[name].[ext]&outputPath=static/img/',//&outputPath=static/img/&publicPath=../img/
            },
            {
                test: /\.(css)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: 'css-loader'
                }]
            },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader'
                }]
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
    plugins: plugins
};
