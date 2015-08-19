/*
* @Author: CC
* @Date:   2015-08-11 15:02:57
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 10:21:44
*/

'use strict'

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    app: (process.env.NODE_ENV === 'prod'
      ? './client/index.js'
      : [
        'webpack/hot/dev-server',
        './client/index.js'
      ]
    ),
    lib: [
      'react',
      'react-router',
      'jquery',
      'antd'
    ]
  },
  output: {
    path: path.join(__dirname, 'assets'),
    filename: '[name].js',
    publicPath: ''
  },
  devServer: {
    hot: true,
    port: 3001,
    historyApiFallback: true,
    publicPath: '',
    conttentBase: 'assets/'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'client']
  },
  plugins: (process.env.NODE_ENV === 'prod'
    ? [new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js')]
    : [new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js'), new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin()]
  ),
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css!autoprefixer-loader?browsers=last 2 version' },
      { test: /\.less$/, loader: 'style!css!less!autoprefixer-loader?browsers=last 2 version' },
      { test: /\.jsx?$/, loader: (process.env.NODE_ENV === 'prod' ? '' : 'react-hot!') + 'babel', exclude: /node_modules/ },
      { test: /\.(woff2?|eot|svg|ttf|jpg|png)$/, loader: 'file' },
    ]
  }
}