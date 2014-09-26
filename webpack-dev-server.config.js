module.exports = require("./make-webpack-config")({
  devServer: true,
  devtool: "source-map",
  debug: true,
  separateStylesheet: true,
});