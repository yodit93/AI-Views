const path = require('path');
const { EnvironmentPlugin } = require('@rspack/core');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  entry: {
    index: './JS/script.js',     // Used in index.html
    prices: './JS/script.js'     // Used in prices.html too
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
    clean: true
  },
  plugins: [
    new EnvironmentPlugin(['GEMINI_API_KEY']),
    new HtmlWebpackPlugin({
      template: './index.html',  // uses your root HTML as a template
      filename: 'index.html'     // outputs to dist/index.html
    }),
    new HtmlWebpackPlugin({
      template: './price.html',  // uses your root HTML as a template
      filename: 'price.html'     // outputs to dist/price.html
    })
  ]
};
