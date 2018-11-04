const baseWebpackConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HashOutput = require('webpack-plugin-hash-output');

if (process.env.NODE_ENV === 'prod') {
    module.exports = merge(baseWebpackConfig, {
        mode: 'production',
        optimization: {
            minimize: true,
            splitChunks: {
                minSize: 0,
                minChunks: 1,
                maxAsyncRequests: 50,
                maxInitialRequests: 30,
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -1,
                        chunks: 'all',
                        name: 'vendors'
                    },
                    easyui: {
                        test: path.resolve(__dirname, './src/assets/libs/jquery-easyui'),
                        priority: -5,
                        chunks: 'initial',
                        name: 'easyui'
                    },
                    echarts: {
                        test: path.resolve(__dirname, './src/assets/libs/echarts'),
                        priority: -6,
                        chunks: 'initial',
                        name: 'echarts'
                    },
                    assets: {
                        test: path.resolve(__dirname, './src/assets'),
                        priority: -10,
                        chunks: 'all',
                        name: 'assets'
                    }
                }
            }
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new OptimizeCssAssetsPlugin(),
            new HashOutput(),
            new webpack.BannerPlugin('CopyRight © 2015-2028 All Right Reserved GuangzhouYan Technology Co.,Ltd')
        ]
    });
} else if (process.env.NODE_ENV === 'dev') {
    module.exports = merge(baseWebpackConfig, {
        mode: 'development',
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.NamedModulesPlugin()
        ],
        devtool: 'eval-source-map',
        devServer: {
            inline: true,
            open: true, // 自动打开浏览器
            contentBase: path.join(__dirname, 'dist'),
            publicPath: '',
            compress: true,
            hot: true,
            host: 'localhost', // 0.0.0.0 localhost
            port: 9000,
            overlay: {
                warnings: false,
                errors: true
            }
        }
    });
}
