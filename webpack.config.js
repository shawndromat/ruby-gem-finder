const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const DIST = "public"
const SOURCE = "src"

module.exports = {
  entry: ['raf', 'babel-polyfill', path.resolve(__dirname, SOURCE, "main.jsx")],
  output: {
    path: path.join(__dirname, DIST),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx+$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css", {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(DIST, "index.html"),
      template: path.resolve(SOURCE, "index.html")
    })
  ]
}