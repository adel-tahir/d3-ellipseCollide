const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'd3-ellipse-collision.js',
    libraryTarget: 'window',
    library: 'ellipseCollision'
  }
};