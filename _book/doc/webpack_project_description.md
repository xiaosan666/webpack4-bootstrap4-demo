# 关于本项目webpack配置说明
* 如果你更开始学习webpack请先阅读[官网文档](https://www.webpackjs.com/concepts/)，了解基本的概念和配置
* 本章只讲解本项目中的配置及遇到过的问题
* 本项目webpack配置文件是[webpack.base.conf.js](https://github.com/yanxiaojun617/webpack4-bootstrap4-demo/blob/master/webpack.base.conf.js)和[webpack.config.js](https://github.com/yanxiaojun617/webpack4-bootstrap4-demo/blob/master/webpack.config.js)

# module.exports.entry
 * entry是配置webpack入口文件，入口文件都是js文件，由于我们是多页面配置,所以entry参数传数组。
 * 考虑到js文件存放的目录比较随意并不一定所有js文件都作为入口文件，所以在[views.json](https://github.com/yanxiaojun617/webpack4-bootstrap4-demo/blob/master/src/views/views.json)
 中配置入口文件路径目录（这里约定每个文件夹是一个入口）.配置代码如下
```javascript
let entry = {};
dirJSON.forEach(page => {
    entry[page.url] = path.resolve(__dirname, `./src/views/${page.url}/index.js`);
});
```

