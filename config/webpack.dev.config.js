const path = require("path")
const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const NameAllModulesPlugin = require("name-all-modules-plugin")
const commonConfig = require("./webpack.common.config.js")

const config = webpackMerge(commonConfig, {
  mode: "development",
  entry: {
    index: [
      "babel-polyfill",
      path.join(__dirname, "../src/index.js")
    ]
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[name].[chunkhash].js"
  },
  devtool: "eval-source-map",
  devServer: {
    host: "0.0.0.0",
    port: 3000,
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
              localIdentName: "[name]--[local]__[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")
              ]
            }
          }
        ],
        include: path.join(__dirname, "../src")
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new NameAllModulesPlugin()
  ]
})

module.exports = config