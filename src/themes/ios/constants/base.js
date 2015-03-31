var supportsHairline = require('./supportsHairline')();

var brandColor = '#307cff';
var light = supportsHairline ? '#d9d9dc' : '#ddd';
var mid = '#bbb';

// cordova
var device = window.device || {};
var version = parseInt(device.version || 0,10);

module.exports = {
  hairline: supportsHairline,
  onePx: supportsHairline ? '0.5px' : '1px',

  // homescreen app
  standalone: window.navigator.standalone,

  // cordova
  device,
  ios7: (
    device.platform === 'iOS' &&
    version >= 7
  ),
  ios8: (
    device.platform === 'iOS' &&
    version >= 8
  ),

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