var fs = require('fs');
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');

module.exports = {

  run: function(opts) {
    var webpackConfig = require(__dirname + '/' + opts.config);
    var wport = Number(opts.wport || process.env.WEBPACKPORT || 2992);
    var base = 'http://' + opts.hostname + ':' + wport + '/';

    webpackConfig.output.publicPath = base;
    var webpackServer = new WebpackDevServer(
      webpack(webpackConfig),
      {
        contentBase: '../',
        quiet: !!opts.quiet,
        hot: !!opts.hot,
        progress: !!opts.progress,
        stats: {
          colors: !!opts.colors,
          timings: true
        }
      }
    );

    console.log('Starting webpack server on', wport);
    webpackServer.listen(wport, opts.hostname);

    var scripts = [
      '<script src="' + base + 'main.js"></script>',
      '<script src="' + base + 'webpack-dev-server.js"></script>'
    ].join("\n");

    return fs
      .readFileSync(__dirname + '/../app/index.html')
      .toString()
      .replace('<!-- SCRIPTS -->', scripts);

  }

};