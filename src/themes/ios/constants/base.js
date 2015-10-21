const supportsHairline = require('./supportsHairline')();

const brandColor = '#307cff';
const light = supportsHairline ? '#d9d9dc' : '#ddd';
const mid = '#bbb';

// cordova
const device = window.device || {};
const version = parseInt(device.version || 0,10);
const standalone = window.navigator.standalone;
const ios7 = device.platform === 'iOS' && version >= 7;
const ios8 = device.platform === 'iOS' && version >= 8;

export default {
  hairline: supportsHairline,
  onePx: supportsHairline ? '0.5px' : '1px',

  // homescreen app
  standalone,

  // cordova
  device,
  ios7,
  ios8,

  // statusbar
  statusBarHeight: (ios7 || standalone) ? 20 : 0,

  black: '#000',
  white: '#fff',
  light: light,
  mid: mid,
  dark: '#8e8e93',

  brandColor: brandColor,
  brandColorInactive: '#a3a3a3',

  active: brandColor,
  inactive: mid,

  activeBG: brandColor,
  activeColor: '#fff',

  edgeWidth: 30
};
