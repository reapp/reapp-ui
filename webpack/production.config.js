module.exports = [
  require("../webpack-config")({
    // commonsChunk: true,
    longTermCaching: true,
    separateStylesheet: true,
    minimize: true,
    devtool: "source-map",
  }),
  require("../webpack-config")({
    prerender: true,
  })
];