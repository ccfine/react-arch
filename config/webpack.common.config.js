const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: path.join(__dirname, "../src")
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "resource/[name].[ext]?[hash]"
        },
        include: path.join(__dirname, "../src")
      }
    ]
  },
  resolve: {
    alias: {
      component: path.join(__dirname, "../src/component"),
      container: path.join(__dirname, "../src/container"),
      action: path.join(__dirname, "../src/redux/action"),
      reducer: path.join(__dirname, "../src/redux/reducer"),
      css: path.join(__dirname, "../src/css"),
      page: path.join(__dirname, "../src/page")
    },
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/index.html"),
      filename: "index.html"
    })
  ]
}