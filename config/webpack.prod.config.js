const path = require("path")
const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const ExtractTextPlugin  = require("extract-text-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const commonConfig = require("./webpack.common.config.js")

const config = webpackMerge(commonConfig, {
  mode: "production",
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
      "axios",
      "react-helmet"
    ]
  },
  output: {
    path: path.join(__dirname, "../build"),
    filename: "js/[name].[chunkhash].js",
    chunkFilename: "js/[name].[chunkhash].js",
    publicPath: "/public/"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: path.join(__dirname, "../src")
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[name]--[local]__[hash:base64]"
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
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJSPlugin(),
    new ExtractTextPlugin({
      filename: "css/[name].[hash].css",
      allChunks: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.RuntimeChunkPlugin({
      name: "manifest"
    }),
    new webpack.optimize.SplitChunksPlugin({
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        index: {
          name: "index",
          chunks: "initial",
          minChunks: Infinity
        },
        vendor: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5, 
          minSize: 0
        }
      }
    }),
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name
      }
      return Array.from(chunk.modulesIterable, m => m.id).join("_")
    })
  ]
})

module.exports = config