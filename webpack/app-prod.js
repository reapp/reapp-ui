var React = require('react');
var Application = require('../app/main');
var Html = require('../app/index.html');

module.exports = function(scriptUrl, styleUrl, commonsUrl) {
  var App = Application(null);
  var Html = React.renderComponentToString(App);

  return Html
    .replace('<!-- STYLES -->', '<link rel="stylesheet" href="' + styleUrl + '" />')
    .replace('<!-- SCRIPTS -->', '<script src="' + scriptUrl '"></script>');
    .replace('COMMONS', commonsUrl)
    .replace('<!-- CONTENT -->', html);
};
