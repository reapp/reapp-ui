module.exports = require("./make")({
  hot: true,
  dev: true,
  hotComponents: true,
  devtool: "source-map",
  debug: true,
  // vendorChunk: true,
  separateStylesheet: false
});
