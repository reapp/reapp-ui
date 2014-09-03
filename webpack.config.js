var path = require('path');

var commonLoaders = [
  { test: /\.jsx$/,  loader: "jsx-loader?harmony?insertPragma=React.DOM" }
];

var assetsPath = path.join(__dirname, 'build', 'js');
var publicPath = 'assets/';

module.exports = [
  {
    name: 'browser',
    entry: './app/app.jsx',
    output: {
      path: assetsPath,
      filename: 'app.js',
      sourceMapFilename: '[file].map'
    },
    devtool: ['source-map'],
    module: {
      loaders: commonLoaders
    },
    resolve: {
      extensions: ["", ".js", ".jsx"],
      modulesDirectories: ['node_modules', 'bower_components']
    }
  },

  {
    name: 'server',
    entry: './app/app.jsx',
    target: 'node',
    output: {
      path: assetsPath,
      publicPath: publicPath
    },
    module: {
      loaders: commonLoaders
    }
  }
];