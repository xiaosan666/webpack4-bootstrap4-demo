const webpack = require('webpack');
const dirJSON = require('./src/views/views.json');
const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = (process.env.NODE_ENV === 'prod');

let entry = {};
let plugins = [];
dirJSON.map(page => {
    entry[page.url] = path.resolve(__dirname, `./src/views/${page.url}/index.js`);
    let chunks = ['easyui', 'vendors', 'default', page.url];
    if (page.excludeEasyui) {
        chunks.splice(chunks.indexOf('easyui'), 1)
    }
    plugins.push(
        new htmlPlugin({
            favicon: path.resolve(__dirname, `./src/assets/img/favicon.ico`),
            filename: path.resolve(__dirname, `./dist/${page.url}.html`),
            template: path.resolve(__dirname, `./src/views/${page.url}/index.html`),
            chunks: chunks,
            chunksSortMode: 'manual',
            minify: isProd ? {
                collapseWhitespace: true,
                removeComments: true
            } : false,
            xhtml: true
        })
    );
});

module.exports = {
    entry: entry,
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, './dist'),
        filename: 'static/js/' + (isProd ? '[name].[contenthash:8].min.js' : '[name].js'),
        chunkFilename: 'static/js/' + (isProd ? '[name].chunk.[contenthash:8].min.js' : '[name].chunk.js'),
    },
    optimization: {
        namedModules: true,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'initial',
            minSize: 0,
            cacheGroups: {
                easyui: {
                    test: /[\\/]src[\\/]assets[\\/]libs[\\/]jquery-easyui[\\/]/,
                    priority: -1,
                    name: 'easyui',
                    reuseExistingChunk: true
                },
                vendors: {
                    test: /[\\/]src[\\/]assets[\\/]/,
                    priority: -10,
                    name: 'vendors',
                    reuseExistingChunk: true
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
            {test: /\.(html|htm)$/, use: [{loader: 'html-withimg-loader'}]},
            {
                test: /\.(png|jpg|jpe?g|gif|svg)$/,
                use: ['url-loader?limit=8192&name=[name].[hash:8].[ext]&outputPath=static/img/', 'image-webpack-loader']
            }, {
                test: /\.(css)$/,
                use: ['css-hot-loader', isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader']
            }, {
                test: /\.(scss)$/,
                use: [{
                    loader: 'css-hot-loader'
                }, {
                    loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader'
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
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015-nostrict'],
                        plugins: ['transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: plugins.concat([
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/' + (isProd ? '[name].[contenthash:8].min.css' : '[name].css'),
            chunkFilename: 'static/css/' + (isProd ? '[name].chunk.[contenthash:8].min.css' : '[name].chunk.css'),
        })
    ])
};
