const path = require("path")
const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const baseConfig = require("./webpack.base.config.js")

const config = webpackMerge(baseConfig, {
  devtool: "eval-source-map",
  entry: {
    index: path.join(__dirname, "../src/index.js")
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].[hash].js"
  },
  devServer: {
    host: "localhost",
    port: "3000",
    contentBase: path.join(__dirname, "../dist"),
    historyApiFallback: true,
    inline: true,
    hot: true,
    open: true,
    overlay: {
      error: true
    },
    proxy: ""
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]--[local]--[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [
                  require("autoprefixer")
                ]
              }
            }
          }
        ],
        include: path.join(__dirname, "../src")
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = config