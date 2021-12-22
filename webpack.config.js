const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/scripts/main.js'),
  watch: true,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: "main.bundled.js"
  }
};