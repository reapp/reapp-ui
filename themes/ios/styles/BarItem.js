module.exports = (c) => ({
  self: {
    flexGrow: 1,
    flexShrink: 0,
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

  'icon-text-text': {
    fontSize: '11px',
    lineHeight: '11px',
    height: 22
  },

  'icon-text-right': {
    flexFlow: 'row'
  },

  'icon-text-right-icon': {
    margin: '0 4px 0 0'
  },

  'icon-text-right-text': {
    fontSize: '12px'
  }
});