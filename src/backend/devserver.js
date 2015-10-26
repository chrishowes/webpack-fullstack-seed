const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');

const compiler = webpack(webpackConfig[1]);
const server = new WebpackDevServer(compiler, webpackConfig[1].devServer);

const PORT = process.env.WEBPACK_DEV_SERVER_PORT || 9090;
const HOST = process.env.WEBPACK_DEV_SERVER_HOST || "0.0.0.0";

server.listen(PORT, HOST, () => {});