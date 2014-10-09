var App = require('../app/main');
var Template = require('../app/index.html');

var RenderedApp = App.start('prod');

module.exports = function(scriptUrl, styleUrl, commonsUrl) {
  return Template
    .replace('<!-- STYLES -->', '<link rel="stylesheet" href="' + styleUrl + '" />')
    .replace('<!-- SCRIPTS -->', '<script src="' + scriptUrl '"></script>');
    .replace('COMMONS', commonsUrl)
    .replace('<!-- CONTENT -->', RenderedApp);
};