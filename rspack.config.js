const path = require('path');
const { EnvironmentPlugin } = require('@rspack/core');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  entry: './JS/script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [new EnvironmentPlugin(['GEMINI_API_KEY'])]
 
};
