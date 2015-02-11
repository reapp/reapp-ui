var supportsHairline = require('./supportsHairline');

var brandColor = '#307cff';
var lightGray = '#ddd';
var midGray = '#bbb';

module.exports = {
  onePx: supportsHairline() ? '1px' : '0.5px',

  black: '#000',
  white: '#fff',
  lightGray: lightGray,
  midGray: midGray,
  darkGray: '#8e8e93',

  brandColor: brandColor,
  brandColorInactive: '#dcdbe2',

  active: brandColor,
  inactive: midGray,

  activeBG: brandColor,
  activeColor: '#fff',

  edgeWidth: 30
};