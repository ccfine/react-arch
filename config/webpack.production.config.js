const path = require("path")
const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const ExtractTextPlugin  = require("extract-text-webpack-plugin")
const baseConfig = require("./webpack.base.config.js")

const config = webpackMerge(baseConfig, {
  entry: {
    index: path.join(__dirname, "../src/index.js"),
    vendor: [
      "react", 
      "react-dom", 
      "redux", 
      "react-redux",
      "redux-thunk",
      "react-router-dom"
    ]
  },
  output: {
    path: path.join(__dirname, "../bundle"),
    filename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: "style-loader",
            use: [
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
            ]
          }
        ),
        include: path.join(__dirname, "../src")
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("style.css")
  ]
})

module.exports = config