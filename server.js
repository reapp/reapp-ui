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

if (yargs.dev) {
  var webpackServer = require('./webpack/server');
  var devTemplate = webpackServer.run({
    config: yargs.config,
    hostname: hostname,
    quiet: yargs.quiet,
    hot: yargs.hot,
    progress: yargs.progress,
    colors: yargs.colors
  })
}
else {
  var prodApp = require('./webpack/app-prod');
}

stack.get('/*', function(req) {
  if (yargs.dev)
    return devTemplate;
  else
    return prodApp(req.path);
});

console.log('Starting', yargs.dev ? 'dev' : 'prod' , 'server');
mach.serve(stack, port)

function addHeader(app, headerName, headerValue) {
  return function (request) {
    return request.call(app).then(function (response) {
      response.headers[headerName] = headerValue;
      return response;
    });
  };
}