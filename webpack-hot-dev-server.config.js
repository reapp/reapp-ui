module.exports = require("./make-webpack-config")({
  hot: true,
  quiet: false,
  devServer: true,
  hotComponents: true,
  devtool: "source-map",
  debug: true,
  separateStylesheet: false
});
