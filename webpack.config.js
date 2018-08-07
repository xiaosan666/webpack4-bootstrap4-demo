const baseWebpackConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

if (process.env.NODE_ENV === 'prod') {
    module.exports = merge(baseWebpackConfig, {
        mode: 'production',
        plugins: [
            new CleanWebpackPlugin(path.resolve(__dirname, './dist'), {
                root: path.resolve(__dirname, './'),
                verbose: false
            }),
            new OptimizeCssAssetsPlugin(),
            new webpack.BannerPlugin('CopyRight © 2015-2028 All Right Reserved GuangzhouYan Technology Co.,Ltd')
        ]
    });
} else if (process.env.NODE_ENV === 'dev') {
    module.exports = merge(baseWebpackConfig, {
        mode: 'development',
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
        ],
        // devtool: 'eval-source-map',
        devServer: {
            // open: true, // 自动打开浏览器
            contentBase: path.join(__dirname, 'dist'),
            publicPath: '',
            compress: true,
            hot: true,
            host: 'localhost',// 0.0.0.0 localhost
            port: 9000,
            overlay: {
                warnings: false,
                errors: true
            }
        },
        watchOptions: {
            //检测修改的时间，以毫秒为单位
            poll: 1000,
            //防止重复保存而发生重复编译错误。这里设置的500是半秒内重复保存，不进行打包操作
            aggregateTimeout: 500,
            //不监听的目录
            ignored: /node_modules/,
        }
    });
} else if (process.env.NODE_ENV === 'buildDev') {
    module.exports = merge(baseWebpackConfig, {
        mode: 'production', // production
        plugins: [
            new CleanWebpackPlugin(path.resolve(__dirname, './dist'), {
                root: path.resolve(__dirname, './'),
                verbose: false
            }),
            new OptimizeCssAssetsPlugin(),
        ]
    });
}

