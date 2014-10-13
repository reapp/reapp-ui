var Promise = require('when').Promise;
var Router = require('react-router');
var fs = require('fs');
var HTML = fs.readFileSync(__dirname+'/../app/index.html').toString();

module.exports = function(App, path) {
  return new Promise(function(resolve, reject) {
    console.log(App)
    Router.renderRoutesToString(App, path, function(err, ar, html, data) {
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