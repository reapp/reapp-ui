/*

  Options
  --dev development mode
    --wport webpack port
  --port server port

*/

var express = require('express');
var path = require('path');
var fs = require('fs');
var yargs = require('yargs').argv;

var app = express();
var port = +(yargs.port || process.env.PORT || 8080);
var webpackPort = +(yargs.wport || process.env.WEBPACKPORT || 2992);

var staticOpts = { maxAge: '200d' };
app.use(express.static(path.join(__dirname, '..', 'build', 'public'), staticOpts));
app.use(express.static(path.join(__dirname, '..', 'app', 'assets'), staticOpts));

var template;

// Development
if (yargs.dev) {
  var scripts = [
    '<script src="http://localhost:' + webpackPort + '/main.js"></script>',
    '<script src="http://localhost:' + webpackPort + '/webpack-dev-server.js"></script>'
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

console.log('running server on port ', port);
app.listen(port);