var React = require("react");
var Application = require("../app/main");
var html = require("../app/prerender.html");

module.exports = function(scriptUrl, styleUrl, commonsUrl) {
  var app = Application(null);
  var html = React.renderComponentToString(app);

  return html
    .replace("STYLE_URL", styleUrl)
    .replace("SCRIPT_URL", scriptUrl)
    .replace("COMMONS_URL", commonsUrl)
    .replace("CONTENT", html);
};
