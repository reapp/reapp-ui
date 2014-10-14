var fs = require('fs');
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');

module.exports = {

  run: function(config, opts, callback) {
    var hostname = opts.hostname || 'localhost';
    var port = Number(opts.wport || process.env.WEBPACKPORT || 2992);
    var base = 'http://' + hostname + ':' + port + '/';

    config.output.publicPath = base;

    var webpackServer = new WebpackDevServer(
      webpack(config),
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

    console.log('Starting webpack server on', port);
    webpackServer.listen(port, hostname);

    var scripts = [
      '<script src="' + base + 'main.js"></script>',
      '<script src="' + base + 'webpack-dev-server.js"></script>'
    ].join("\n");

    var template = fs
      .readFileSync(__dirname + '/../app/index.html')
      .toString()
      .replace('<!-- SCRIPTS -->', scripts);

    callback.call(this, template);
  }

};