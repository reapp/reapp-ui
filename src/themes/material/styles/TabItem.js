module.exports = (c) => ({
  self: {
    color: '#FFFFFF',
    opacity: .5,
    margin: '0 auto',
    width: '100%',
    height: 'auto',
    position: 'relative',
    flex: '1 1 auto'
  },
  active: {
    opacity: 1
  },
  'button--self': {
    minWidth: '0',
    flex: '1 1 auto'
  },
  'button--text': {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '0 0'
  }
});