module.exports = require("../webpack-config")({
  hot: true,
  devServer: true,
  hotComponents: true,
  devtool: "source-map",
  debug: true,
  separateStylesheet: false
});
