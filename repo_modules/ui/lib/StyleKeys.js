if (typeof document !== 'undefined') {
  var TRANSFORM = typeof document.body.style.MozTransform !== 'undefined' ?
    '-moz-transform' : '-webkit-transform';
  var FILTER = typeof document.body.style.MozFilter !== 'undefined' ?
    '-moz-filter' : '-webkit-filter';

  module.exports = { TRANSFORM, FILTER };
}