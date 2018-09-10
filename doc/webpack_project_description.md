* 如果你刚开始学习webpack请先阅读[官网文档](https://www.webpackjs.com/concepts/)，了解基本的概念和配置
* 本章只讲解本项目中的配置及遇到过的问题
* 本项目webpack配置文件是[webpack.base.conf.js](https://github.com/yanxiaojun617/webpack4-bootstrap4-demo/blob/master/webpack.base.conf.js)和[webpack.config.js](https://github.com/yanxiaojun617/webpack4-bootstrap4-demo/blob/master/webpack.config.js)

## module.exports.entry
 * entry是配置webpack入口文件，入口文件都是js文件，由于我们是多页面配置,所以entry参数配置为数组
 * 配置webpack要有一个认识，所以资源都是围绕js文件展开的，像其他的html，css资源都要导入到js文件中,然后把js文件作为打包入口去打包
 * 考虑到js文件存放的目录比较随意并不一定所有js文件都作为打包入口文件，所以在[views.json](https://github.com/yanxiaojun617/webpack4-bootstrap4-demo/blob/master/src/views/views.json)
 中配置入口文件路径目录（这里约定每个文件夹是一个入口）.配置代码如下
```
let entry = {};
dirJSON.forEach(page => {
    entry[page.url] = path.resolve(__dirname, `./src/views/${page.url}/index.js`);
});
```

## module.exports.output
 * output是配置webpack出口文件，对应每个入口文件（在entry配置的js文件），output主要配置js文件的输入路径，文件名称等
 
 
## module.exports.plugins
 * 该配置以全局的视角处理资源，如删除文件，压缩资源，提取合并资源等
 * webpack只处理js文件，对于其他类型的资源要借助插件或者“loader”，如下代码使用[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)插件处理html，
 该插件可以指定html的模版、输出路径、文件名、是否压缩及引用哪些资源（chunks）等，因为我们是多页面，所以需要遍历
 [views.json](https://github.com/yanxiaojun617/webpack4-bootstrap4-demo/blob/master/src/views/views.json)对每个html模版添加插件
 ```
    let plugins = [];
    dirJSON.forEach(page => {
         plugins.push(
             new HtmlPlugin({
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
```
 
 * 默认情况下css会和js打包在一个文件中，如下代码，使用[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
 提取样式内容到单独的css文件,可以指定提取后输出的目录，文件名等
```
    new MiniCssExtractPlugin({
        filename: 'css/' + (isProd ? '[name].[contenthash:8].min.css' : '[name].css'),
        chunkFilename: 'css/' + (isProd ? '[name].chunk.[contenthash:8].min.css' : '[name].chunk.css'),
    })
```

## module.exports.module.rules
 * 主要配置项目中的各种类型资源用什么工具处理，如html使用`html-withimg-loader`，图片使用`url-loader`等
 * 如下代码所示，处理图片使用`url-loade`和`image-webpack-loader`,
    `limit=4096`表示将小于4kb的图片转为base64字符串嵌在html中，limit参数单位是byte，不是kb，
    `outputPath=img/`指定图片输出在img目录下；  
    `image-webpack-loader`用于压缩图片,注意所有的loader都是从后向前执行，对于这里的图片处理，先执行`image-webpack-loader`压缩图片，然后使用`url-loade`处理图片
  ```
    {
        test: /\.(png|jpg|jpe?g|gif|svg)$/,
        use: ['url-loader?limit=4096&name=[name]' + (isProd ? '.[hash:8]' : '') + '.[ext]&outputPath=img/', 'image-webpack-loader']
    }
 ```
 
 * 如下代码是对css文件的处理（scss文件同理，该项目使用scss写样式）。使用[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)插件提取样式内容，同时需要配置
 `MiniCssExtractPlugin.loader`，参数`publicPath: '../'`可以指定css样式中图片的发布路径，如果不配置css中的图片资源会引用不到（background:url('')），因为我们把
 图片放在/img目录下，css放在css目录下，css要引用到图片需要`../img/`。要么使用绝对路径；  
 `css-hot-loader`用于监听css文件的改变刷新页面
 ```
    {
        test: /\.(css)$/,
        use: [{
            loader: 'css-hot-loader'
        }, {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '../'
            }
        }, {
            loader: 'css-loader'
        }]
    }
```

## module.exports.optimization.splitChunks
* webpack4资源分割配置，默认情况下html所引用的js会放在一个js文件中，但是对于公共的js内容我们想放在一起，于是有了如下配置，
参数`test`指定打包的资源目录，`name`给资源起个别名，生成的文件叫chunk，如下代码配置，
我们把'./node_modules'和'./src/assets/libs'目录下用到的js打包在一起并起名为'vendors'，把'./src/assets'目录下的资源打包在一起并起chunk名为'assets'
* 该配置只需在打包环境（production）下使用，开发模式不需要，所以此配置在[webpack.config.js](https://github.com/yanxiaojun617/webpack4-bootstrap4-demo/blob/master/webpack.config.js)文件中

```
 splitChunks: {
     chunks: 'initial',
     minSize: 0,
     cacheGroups: {
         vendors: {
             test: path.resolve(__dirname, './node_modules'),
             priority: -1,
             name: 'vendors'
         },
         libs: {
             test: path.resolve(__dirname, './src/assets/libs'),
             priority: -5,
             name: 'vendors'
         },
         assets: {
             test: path.resolve(__dirname, './src/assets'),
             priority: -10,
             name: 'assets'
         }
     }
 }
```


# 关于文件使用hash命名
* 对于webpack中的hash，chunkhash，contenthash还不了解，请先百度
* 为了使缓存最大化，js、css和图片均使用hash命名，对于每次打包文件内容不变则文件名不变。使用hash命名只在打包环境（production）下，开发环境下不需要
* 图片名为`[name].[hash:8].[ext]`
* css利用mini-css-extract-plugin插件配置文件名为`[name].[contenthash:8].min.css`,chunk名为`[name].chunk.[contenthash:8].min.css`
* js文件命令为`[name].[chunkhash].min.js`，chunk名为`[name].chunk.[chunkhash].min.js`。使用[webpack-plugin-hash-output](https://github.com/scinos/webpack-plugin-hash-output)插件
生成chunkhash，这里不能使用[chunkhash:8],否则js文件名会每次改变；webpack4对js文件也提供了contenthash但是没有效果，可能是提取css时导致了js文件变化


# 关于文件的压缩
> 文件压缩只需在打包情况下使用，开发模式不使用  
* html压缩在[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)中配置`minify`参数，该插件依赖`html-minifier`
具体配置可以看[这里](https://github.com/kangax/html-minifier#options-quick-reference)
* 如下代码配置是取消html中的空格和删除注释
```
 new HtmlPlugin({
     minify: isProd ? {
         collapseWhitespace: true,
         removeComments: true
     } : false,
 })
```

* css压缩
使用[optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)插件

* js压缩
设置module.exports.optimization.minimize为true，webpack使用[uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)插件压缩js

