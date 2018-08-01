const baseWebpackConfig = require('./webpack.base.conf');

const webpack = require('webpack');
const path = require('path');
const merge = require("webpack-merge");

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    // devtool: 'eval-source-map',
    devServer: {
        // open: true, // 自动打开浏览器
        contentBase: path.join(__dirname, "dist"),
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
