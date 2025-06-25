const path = require('path');
const { EnvironmentPlugin } = require('@rspack/core');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  entry: './JS/script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new EnvironmentPlugin(['GEMINI_API_KEY']),
    new HtmlWebpackPlugin({
      template: './index.html',  // uses your root HTML as a template
      filename: 'index.html'     // outputs to dist/index.html
    })
  ]
};
