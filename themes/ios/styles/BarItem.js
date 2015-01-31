module.exports = (c) => ({
  self: {
    flexGrow: 1,
    flexShrink: 0,
    WebkitFlexGrow: 1,
    WekitFlexShrink: 0,
    color: c.barColor
  },

  icon: {
    margin: 'auto'
  },

  active: {
    background: c.barBG,
    color: c.barColorActive,
  },

  'icon-text': {},

  'icon-icon': {
    flexGrow: 1,
    WebkitFlexGrow: 1
  },

  'icon-text__text': {
    fontSize: '11px',
    lineHeight: '11px',
    height: 22
  },

  'icon-text-right': {
    flexFlow: 'row',
    WebkitFlexFlow: 'row'
  },

  'icon-text-right__icon': {
    margin: '0 4px 0 0'
  },

  'icon-text-right__text': {
    fontSize: '12px'
  }
});