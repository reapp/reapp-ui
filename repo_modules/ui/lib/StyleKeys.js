if (typeof document !== 'undefined') {
  var TRANSFORM_KEY = typeof document.body.style.MozTransform !== 'undefined' ? '-moz-transform' : '-webkit-transform';
  var FILTER_KEY = typeof document.body.style.MozFilter !== 'undefined' ? '-moz-filter' : '-webkit-filter';

  module.exports = {
    TRANSFORM: TRANSFORM_KEY,
    FILTER: FILTER_KEY
  };
}