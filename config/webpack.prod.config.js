const path = require("path")
const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const ExtractTextPlugin  = require("extract-text-webpack-plugin")
const NameAllModulesPlugin = require("name-all-modules-plugin")
const commonConfig = require("./webpack.common.config.js")

const config = webpackMerge(commonConfig, {
  entry: {
    index: [
      "babel-polyfill",
      path.join(__dirname, "../src/index.js")
    ],
    vendor: [
      "react",
      "prop-types",
      "react-dom",
      "redux",
      "react-redux",
      "redux-thunk",
      "react-router-dom",
      "axios"
    ]
  },
  output: {
    path: path.join(__dirname, "../build"),
    filename: "[name].[chunkhash].js",
    publicPath: "/public/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
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
          ]
        }),
        include: path.join(__dirname, "../src")
      }
    ]
  },
  optimization: {
    runtimeChunk: {
        name: "manifest"
    },
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /node_modules/,
                name: "vendor",
                chunks: "all"
            }
        }
    }
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: "[name].[contenthash:5].css",
      allChunks: true
    }),
    new webpack.NamedModulesPlugin(),
    new NameAllModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name
      }
      return chunk.mapModules(m => path.relative(m.context, m.request)).join("_")
    })
  ]
})

module.exports = config