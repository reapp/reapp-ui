module.exports = (c) => ({
  self: {
    color: '#FFFFFF',
    opacity: .5,
    margin: '0 auto',
    width: '100%',
    height: 'auto',
    position: 'relative',
    padding: '5px',
    flex: '1 1 auto'
  },
  active: {
    opacity: 1
  },
  'button--self': {
    flex: '1 1 auto'
  },
  'button--text': {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});