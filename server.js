/*
  Options
  --dev development mode
  --port server port
  (for webpack)
  --config [path]
  --wport webpack port
  --quiet --colors --progress --hot
*/

var mach = require('mach');
var path = require('path');
var yargs = require('yargs').argv;
var os = require('os');
var fs = require('fs');
var webpack = require('webpack');
var webpackConfig = require(__dirname + '/webpack/' + yargs.config);

console.log(webpackConfig)

var stack = mach.stack();
var hostname = 'localhost'; //os.hostname() ||
var port = Number(yargs.port || process.env.PORT || 8080);

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

// if (yargs.dev) {
//   var webpackServer = require('./webpack/server');
//   var devTemplate = webpackServer.run(App, yargs, { hostname: hostname })
// }
// else {
var prodApp = require('./webpack/app-prod');
// }

var App;

webpack(webpackConfig, function(err, stats) {
  console.log('ERR', err, stats);

  if (!err) {
    App = fs.readFileSync(webpackConfig[0].output.path + '/main.js');
    console.log('APP IS', App.toString());
  }
});

stack.get('/*', function(req) {
  // if (yargs.dev)
    // return devTemplate;
  // else
    return prodApp(App, req.path);
});

console.log('Starting', yargs.dev ? 'dev' : 'prod' , 'server');
mach.serve(stack, port);

function addHeader(app, headerName, headerValue) {
  return function (request) {
    return request.call(app).then(function (response) {
      response.headers[headerName] = headerValue;
      return response;
    });
  };
}