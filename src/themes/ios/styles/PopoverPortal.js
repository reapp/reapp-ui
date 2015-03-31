module.exports = (c) => ({
  self: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    background: c.popoverOverlayBG
  },

  popover: {
    position: 'absolute',
    fontSize: '16px',
    background: c.popoverBG,
    borderRadius: 5,
    textAlign: 'center'
  },

  list: {
    padding: 0,
    margin: 0
  },

  link: {
    textDecoration: 'none',
    padding: 7
  },

  arrow: {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: '50%'
  },

  arrowInner: {
    background: c.popoverBG,
    position: 'absolute',
    left: 0,
    borderRadius: 3,
    transform: 'rotate(45deg)',
    WebkitTransform: 'rotate(45deg)'
  },

  item: {
    minWidth: 120,
    borderTop: c.popoverItemBorder,
  },

  itemFirstChild: {
    borderTop: 'none'
  }
});