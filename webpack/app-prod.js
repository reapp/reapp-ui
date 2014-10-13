var Promise = require('when').Promise;
var Router = require('react-router');
var App = require('../app/main');
var HTML = require('../app/index.html').toString();

var routedApp = App.start('prod');

module.exports = function(path) {
  return new Promise(function(resolve, reject) {
    Router.renderRoutesToString(routedApp, path, function(err, ar, html, data) {
      var output = HTML
        .replace('<!-- CONTENT -->', html)
        .replace('<!-- DATA -->', '<script>window.ROUTER_PROPS = ' + JSON.stringify(data) + ';</script>');

      resolve(output);
    });
  });
}

// module.exports = function(scriptUrl, styleUrl, commonsUrl) {
//   return Template
//     .replace('<!-- STYLES -->', '<link rel="stylesheet" href="' + styleUrl + '" />')
//     .replace('<!-- SCRIPTS -->', '<script src="' + scriptUrl '"></script>');
//     .replace('COMMONS', commonsUrl)
//     .replace(, routedApp);
// };