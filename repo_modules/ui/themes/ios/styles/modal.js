module.exports = {
  self: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    visibility: 'hidden',
    zIndex: -1
  },

  open: {
    visibility: 'visible',
    zIndex: 15000
  },

  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.45)'
  },

  window: {
    minWidth: 270,
    maxWidth: '100%',
    margin: 'auto',
    background: 'rgba(255,255,255,0.95)',
    padding: 0,
    borderRadius: 7,
    textAlign: 'center'
  },

  inner: {
    padding: 15,
    borderBottom: '1px solid #b5b5b5'
  },

  title: {
    fontSize: '18px',
    fontWeight: 500
  },

  text: {
    marginTop: 5
  }
};