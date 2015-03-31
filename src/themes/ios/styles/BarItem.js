module.exports = (c) => ({
  self: {
    flexGrow: 1,
    flexShrink: 0,
    WebkitFlexGrow: 1,
    WekitFlexShrink: 0,
    color: c.barColor,
    justifyContent: 'center',
    WebkitJustifyContent: 'center'
  },

  icon: {
    margin: 'auto',
    flexGrow: 1,
    WebkitFlexGrow: 1,
    height: '100%'
  },

  active: {
    background: c.barBG,
    color: c.barColorActive,
    fontWeight: 500
  },

  'icon__text': {
    display: 'none'
  },

  'display:icon__icon': {
    flexGrow: 1,
    WebkitFlexGrow: 1
  },

  'display:icon-text__icon': {
    margin: '-2px 0 -2px 0',
    flexGrow: 1,
    WebkitFlexGrow: 1
  },

  'display:icon-text__text': {
    fontSize: '11px',
    lineHeight: '11px',
    fontWeight: 500,
    margin: '0 0 2px 0'
  },

  'icon-text-right': {
    flexFlow: 'row',
    WebkitFlexFlow: 'row'
  },

  'display:icon-text-right__icon': {
    margin: '0 4px 0 0'
  },

  'display:icon-text-right__text': {
    fontSize: '12px'
  }
});