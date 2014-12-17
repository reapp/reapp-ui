if (typeof document !== 'undefined') {
  var TRANSFORM = typeof document.body.style.MozTransform !== 'undefined' ?
    'MozTransform' : 'WebkitTransform';
  var FILTER = typeof document.body.style.MozFilter !== 'undefined' ?
    'MozFilter' : 'WebkitFilter';

  module.exports = { TRANSFORM, FILTER };
}