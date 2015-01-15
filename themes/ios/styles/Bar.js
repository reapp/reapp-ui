module.exports = (c) => ({
  self: {
    background: c.barBG,
    height: c.barHeight,
    lineHeight: c.barLineHeight,
    borderTop: `1px solid ${c.barBorderColor}`,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    flexFlow: 'row',
    margin: 0,
    padding: 0,
    justifyContent: 'space-between',
    alignContent: 'stretch',
    textAlign: 'center'
  },

  'position-top': {
    top: 0,
    bottom: 'auto'
  }
});