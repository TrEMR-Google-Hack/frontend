const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');

const rootPath = __dirname; // eslint-disable-line no-undef
const sourcePath = path.join(rootPath, 'src');
const buildPath = path.join(rootPath, 'build');

rimraf.sync(buildPath);

module.exports = {
  context: sourcePath,
  entry: ['babel-polyfill', 'whatwg-fetch', path.join(sourcePath, 'index.js')],
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.ico$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    modules: [sourcePath, 'node_modules']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(sourcePath, 'index.html'),
      filename: 'index.html',
      title: 'HTML App Title',
      minify: true
    }),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      // eslint-disable-next-line no-undef
      __DEV__: process.env.NODE_ENV !== 'production'
    })
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true
  }
};
