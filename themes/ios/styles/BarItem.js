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

  'display-text': {
    fontSize: '11px',
    lineHeight: '11px',
    height: 22
  },

  'display-icon': {
    flexFlow: 'row'
  },

  'display-icon-text': {
    margin: '0 4px 0 0'
  },

  'display-icon-text-right': {
    fontSize: '12px'
  }
});