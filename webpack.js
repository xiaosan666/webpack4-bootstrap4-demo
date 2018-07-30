const devWebpackConfig = require('./config/webpack.dev.conf');
const prodWebpackConfig = require('./config/webpack.prod.conf');

if (process.env.NODE_ENV === 'productions') {
    module.exports = prodWebpackConfig
} else {
    module.exports = devWebpackConfig
}

