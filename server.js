/*
  Options
  --dev development mode
  --port server port

  Opts passed to webpack
  --config [path]
  --wport webpack port
  --quiet
  --colors
  --progress
  --hot
*/

var express = require('express');
var path = require('path');
var fs = require('fs');
var yargs = require('yargs').argv;
var os = require("os");

var hostname = os.hostname() || 'localhost';

var app = express();
var port = Number(yargs.port || process.env.PORT || 8080);

var staticOpts = { maxAge: '200d' };
app.use(express.static(path.join(__dirname, 'build', 'public'), staticOpts));
app.use(express.static(path.join(__dirname, 'app', 'assets'), staticOpts));
app.use(express.static(path.join(__dirname, 'web_modules'), staticOpts));

var template;

// Development
if (yargs.dev) {
  // CORS
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
   });

  // Setup webpack
  var WebpackDevServer = require("webpack-dev-server");
  var webpack = require("webpack");
  var webpackConfig = require(path.join(__dirname, yargs.config));
  var wport = Number(yargs.wport || process.env.WEBPACKPORT || 2992);

  // Update config to use webpack port
  webpackConfig.output.publicPath = 'http://' + hostname + ':' + wport + '/';

  var compiler = webpack(webpackConfig);
  var wpDevServerOpts = {
    contentBase: '../',
    quiet: !!yargs.quiet,
    hot: !!yargs.hot,
    progress: !!yargs.progress,
    stats: { colors: !!yargs.colors }
  };

  var webpackServer = new WebpackDevServer(compiler, wpDevServerOpts);
  console.log('Starting webpack server on', wport);
  webpackServer.listen(wport, hostname);

  var scripts = [
    '<script src="http://'+ hostname +':' + wport + '/main.js"></script>',
    '<script src="http://'+ hostname +':' + wport + '/webpack-dev-server.js"></script>'
  ].join("\n");

  template = fs
    .readFileSync(path.join(__dirname, '/app/index.html'))
    .toString()
    .replace('<!-- SCRIPTS -->', scripts);
}

// Production
else {
  var stats = require('../build/stats.json');
  var prerenderApplication  = require('../build/prerender/main.js');
  var STYLE_URL = 'main.css?' + stats.hash;
  var SCRIPT_URL = [].concat(stats.assetsByChunkName.main)[0];
  var COMMONS_URL = [].concat(stats.assetsByChunkName.commons)[0];

  template = prerenderApplication(SCRIPT_URL, STYLE_URL, COMMONS_URL);
}

app.get('/*', function(req, res) {
  res.contentType = 'text/html; charset=utf8';
  res.end(template);
});

console.log(
  'Starting',
  yargs.dev ? 'dev' : 'prod' ,
  'server on port',
  port
);

app.set('10.0.1.99', 'loopback')
app.listen(port);