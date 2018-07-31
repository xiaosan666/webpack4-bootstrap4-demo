const webpack = require('webpack');
let glob = require("glob");
const dirJSON = require('../src/views/views.json');
const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const extractTextPlugin = require("extract-text-webpack-plugin");

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
// plugins.push(new extractTextPlugin("./static/css/[chunkhash].css"));
plugins.push(new webpack.ProvidePlugin({
    "$": "jquery",
    "jQuery": "jquery",
    "window.jQuery": "jquery"
}));
/*plugins.push(new webpack.optimize.SplitChunksPlugin({
    chunks: "all",
    minSize: 0,
    cacheGroups: {
        vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
            test: /node_modules\//,
            name: 'page/vendor',
            priority: 10,
            enforce: true
        }
    }
}));*/

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
            /*{
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {importLoaders: 1}},
                        'postcss-loader'
                    ],
                    publicPath: "../../",
                })

            },
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        }, {
                            loader: "less-loader"
                        }, 'postcss-loader'
                    ],
                    publicPath: "../../"
                })
            },*/
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
            },
            {
                test: /\.(png|jpg|jpe?g|gif|svg)$/,
                use: 'url-loader?limit=8192&name=[name].[ext]?[hash:8]&outputPath=static/img/',
            },
            /*{
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: [{
                    loader: 'file-loader?limit=1024&name=[name].[ext]?[hash:8]',
                    options: {
                        outputPath: 'static/images/',
                    }
                }]
            },*/
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
