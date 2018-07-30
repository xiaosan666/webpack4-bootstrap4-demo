const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

module.exports = {
    mode: 'development',// production development
    module: {
        rules: [
            {test: /\.(htm|html)$/, use: ['raw-loader']},
            {
                test: /\.(scss|css$)$/,
                use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [require('autoprefixer')];
                        }
                    }
                }, {loader: 'sass-loader'}]
            }]
    },
    output: {
        filename: 'index.[hash:8].min.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        })
    ],
    // devtool: 'cheap-eval-source-map',
    devServer: {
        // open: true, // 自动打开浏览器
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        hot: true,
        host: 'localhost',// 0.0.0.0 localhost
        port: 9000,
        overlay: {
            warnings: false,
            errors: true
        }
    }
};
