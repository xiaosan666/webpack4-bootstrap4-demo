const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

module.exports = {
    mode: 'development',// production development
    module: {
        rules: [
            {test: /\.(htm|html)$/, use: ['raw-loader']},
            {
                test: /\.css$/,
                use: [{loader: 'style-loader'}, {loader: 'css-loader', options: {modules: true}}]
            },
            /*{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}*/
            { test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,  loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot$/,  loader: "file-loader" },
            { test: /\.svg$/,  loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
            /*{
                test: /.woff|.woff2|.svg|.eot|.ttf/,
                use: 'url-loader?prefix=font/&limit=10000'
            }*/
        ]
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
