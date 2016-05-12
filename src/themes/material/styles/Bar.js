export default c => ({
  self: {
    background: c.barBG,
    height: c.barHeight,
    lineHeight: c.barLineHeight,
    boxShadow: '0 0 2px rgba(0,0,0,0.12), 2px 0 2px rgba(0,0,0,0.24)',
    zIndex: 3,
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
  },

  'position-bottom': {
    bottom: 0,
    top: 'auto',
    position: 'fixed'
  }
});