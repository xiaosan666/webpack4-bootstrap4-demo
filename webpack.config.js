const baseWebpackConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")

if (process.env.NODE_ENV === 'prod') {
    module.exports = merge(baseWebpackConfig, {
        mode: 'production',
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new webpack.HashedModuleIdsPlugin(),
            new OptimizeCssAssetsPlugin(),
            new CompressionPlugin({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.(js|css)$/,
                threshold: 10240
            }),
            new webpack.BannerPlugin('CopyRight © 2015-2028 All Right Reserved GuangzhouYan Technology Co.,Ltd')
        ]
    });
} else if (process.env.NODE_ENV === 'dev') {
    module.exports = merge(baseWebpackConfig, {
        mode: 'development',
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        ],
        devServer: {
            open: true, // 自动打开浏览器
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
        }
    });
} else if (process.env.NODE_ENV === 'devBuild') {
    module.exports = merge(baseWebpackConfig, {
        mode: 'development', // development production
        plugins: [
            new CleanWebpackPlugin(['dist'])
        ]
    });
}

