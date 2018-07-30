const baseWebpackConfig = require('./webpack.base.conf');

const webpack = require('webpack');
const path = require('path');
const merge = require("webpack-merge");
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseWebpackConfig,{
    mode: 'production',
    plugins:[
        new CleanWebpackPlugin(['../dist']),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions:{
                safe:true
            }
        }),
        new uglifyjsWebpackPlugin({
            uglifyOptions: {
                output: {
                    comments: false
                }
            }
        }),
        new webpack.BannerPlugin('CopyRight © 2015-2018 All Right Reserved Beijing Gongzhu Technology Co.,Ltd')
    ]
})
