var supportsHairline = require('./supportsHairline')();

var brandColor = '#307cff';
var light = supportsHairline ? '#d9d9dc' : '#ddd';
var mid = '#bbb';

module.exports = {
  hairline: supportsHairline,
  onePx: supportsHairline ? '0.5px' : '1px',

  black: '#000',
  white: '#fff',
  light: light,
  mid: mid,
  dark: '#8e8e93',

  brandColor: brandColor,
  brandColorInactive: '#dcdbe2',

  active: brandColor,
  inactive: mid,

  activeBG: brandColor,
  activeColor: '#fff',

  edgeWidth: 30
};