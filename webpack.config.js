'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const Loaders = [{
  test: /\.(js|jsx)$/,
  exclude: [/node_modules/, /webpack/],
  loaders: process.env.NODE_ENV === "production" ? [
      "babel?whitelist[]=flow", 
      "babel?blacklist[]=flow&optional[]=runtime&stage=0"
    ] : [
      "babel?whitelist[]=flow", 
      "flowcheck",
      "babel?blacklist[]=flow&optional[]=runtime&stage=0"
    ]
}];

const Alias = {
  common: __dirname + "/src/common",
  types: __dirname + "/src/common/types.js",
}

const nodeConfig = {
  entry: [
    "webpack/hot/signal.js",
    "./src/backend/index.js",
  ],
  output: {
    path: __dirname + "/build",
    filename: "backend.js"
  },
  recordsPath: __dirname + "/build/records",
  plugins: [
    new webpack.HotModuleReplacementPlugin({quiet: true})
  ],
  module: {
    loaders: Loaders
  },
  resolve: {
    alias: Alias
  },
  target: "node",
  externals: nodeModules,
};

const webConfig = {
  entry: "./src/frontend/index.jsx",
  output: {
    path: __dirname + "/build",
    filename: "frontend.js"
  },
  module: {
    loaders: Loaders
  },
  resolve: {
    alias: Alias
  },
  devServer: {}
};

module.exports = [nodeConfig, webConfig];
