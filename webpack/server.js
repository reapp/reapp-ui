var fs = require('fs');
var WebpackDevServer = require('webpack-dev-server');

module.exports = {

  run: function(App, opts, conf) {
    var port = Number(opts.wport || process.env.WEBPACKPORT || 2992);
    var base = 'http://' + conf.hostname + ':' + port + '/';

    webpackConfig.output.publicPath = base;
    var webpackServer = new WebpackDevServer(
      App,
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
    webpackServer.listen(port, conf.hostname);

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