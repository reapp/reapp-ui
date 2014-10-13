module.exports = [
  require("./make-config")({
    // commonsChunk: true,
    longTermCaching: true,
    // separateStylesheet: true,
    minimize: true,
    devtool: "source-map",
  })
  // ,
  // require("./make-config")({
  //   prerender: true,
  // })
];