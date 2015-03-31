module.exports = (c) => ({
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
    zIndex: 15000,
    opacity: 1
  },

  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: c.modalBackgroundBG
  },

  modal: {
    minWidth: 270,
    maxWidth: '80%',
    margin: 'auto',
    background: c.modalBG,
    padding: 0,
    borderRadius: 7,
    textAlign: 'center',
    flexShrink: 1,
    WebkitFlexShrink: 1
  },

  buttons: {
    flexFlow: 'row',
    WebkitFlexFlow: 'row'
  },

  inner: {
    padding: 15,
    borderBottom: `${c.onePx} solid ${c.modalBorderColor}`
  },

  title: {
    color: c.black,
    fontSize: '18px',
    fontWeight: 500
  },

  text: {
    marginTop: 5
  }
});