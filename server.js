/* --dev --port [#] --config [path] --wport [#] --quiet --colors --progress --hot */

var mach = require('mach');
var path = require('path');
var yargs = require('yargs').argv;
var fs = require('fs');
var util = require('util');
var Promise = require('when').Promise;
var Router = require('react-router');
var webpack = require('webpack');
var webpackConfig = require(path.join(
    __dirname, '/webpack/', (yargs.config || 'config.production.js')));

var stack = mach.stack();
var port = Number(yargs.port || process.env.PORT || 5283);

console.log('Starting', yargs.dev ? 'dev' : 'prod' , 'server...');

var staticPaths = [
  path.join(__dirname, 'build', 'public'),
  path.join(__dirname, 'app', 'assets'),
  path.join(__dirname, 'web_modules')
];

staticPaths.forEach(function(path) {
  stack.use(mach.file, {root: path});
});

stack.use(mach.logger);
stack.use(addHeader, 'Access-Control-Allow-Origin', '*');
stack.use(addHeader, 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
stack.run();

if (yargs.dev)
  runDevelopmentServer();
else
  runProductionServer();

function runDevelopmentServer() {
  var webpackServer = require('./webpack/server');
  var hostname = 'localhost'; //os.hostname()
  yargs.hostname = hostname;

  webpackServer.run(webpackConfig, yargs, function(template) {
    stack.get('/*', function() { return template });
  });

  runMach();
}

function runProductionServer() {
  var config = webpackConfig[1];
  debug('Webpack Config', "\n", config);

  webpack(webpackConfig, function(err, stats) {
    if (err) console.log(err, stats);
    else {
      var outputPath = config.output.path;
      var app = require(outputPath + '/main.js');
      var stats = require(outputPath + '/../stats.json');
      var STYLE_URL = 'main.css?' + stats.hash;
      var SCRIPT_URL = [].concat(stats.assetsByChunkName.main)[0] + '?' + stats.hash;

      stack.get('/*', function(req) {
        return renderProductionApp(app, req.path, STYLE_URL, SCRIPT_URL);
      });

      runMach();
    }
  });
}

function runMach() {
  console.log('Mach server running on', port);
  mach.serve(stack, {
    port: port,
    quiet: true
  });
}

function renderProductionApp(app, path, styleUrl, scriptUrl) {
  return new Promise(function(resolve, reject) {
    Router.renderRoutesToString(app, path, function(err, ar, html, data) {
      console.log(path, ar);
      if (ar) {
        reject({ redirect: true, to: '/' + ar.to + '/' + ar.params.id,  }); // todo finish
      }

      var HTML = fs.readFileSync(__dirname + '/app/index.html').toString();
      var output = HTML
        .replace('<!-- CONTENT -->', html)
        .replace('<!-- DATA -->', '<script>window.ROUTER_PROPS = ' + JSON.stringify(data) + ';</script>')
        .replace('<!-- STYLES -->', '<link rel="stylesheet" type="text/css" href="/' + styleUrl + '" />')
        .replace('<!-- SCRIPTS -->', '<script src="/' + scriptUrl + '"></script>');

      resolve(output);
    });
  });
};

function addHeader(app, headerName, headerValue) {
  return function(request) {
    return request.call(app).then(function (response) {
      response.headers[headerName] = headerValue;
      return response;
    });
  };
}

function debug() {
  (yargs.debug) ?
    console.log(require('util').inspect(
      Array.prototype.slice.call(arguments, 0), true, 4)) :
    void 0;
}