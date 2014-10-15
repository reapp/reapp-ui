module.exports = [
  require("./make")({
    // commonsChunk: true,
    // longTermCaching: true,
    separateStylesheet: true,
    // minimize: true,
    // devtool: "source-map"
  })
  ,
  require("./make")({
    prerender: true
  })
];