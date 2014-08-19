module.exports = {
  entry: [
    './app/app.jsx'
  ],
  output: {
    path: __dirname + '/build/js/',
    filename: 'app.js',
    sourceMapFilename: '[file].map'
  },
  devtool: ['source-map'],
  module: {
    loaders: [
      { test: /\.jsx$/,  loader: "jsx-loader" }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    modulesDirectories: ['node_modules', 'bower_components']
  }
};