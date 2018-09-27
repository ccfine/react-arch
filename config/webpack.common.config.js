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
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "resource/[name].[ext]?[hash]"
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ],
        include: path.join(__dirname, "../src")
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "font/[name].[md5:hash:hex:7].[ext]"
        },
        include: path.join(__dirname, "../src")
      }
    ]
  },
  resolve: {
    alias: {
      component: path.join(__dirname, "../src/component"),
      page: path.join(__dirname, "../src/page"),
      action: path.join(__dirname, "../src/redux/action"),
      reducer: path.join(__dirname, "../src/redux/reducer"),
      css: path.join(__dirname, "../src/css"),
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