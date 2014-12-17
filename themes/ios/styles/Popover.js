module.exports = (c) => ({
  self: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    visibility: 'hidden',
    background: c.popoverOverlayBG,
    opacity: 0,
    transition: 'opacity 300ms ease-in'
  },

  open: {
    opacity: 1,
    visibility: 'visible',
    zIndex: 15000
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
    width: c.popoverArrowSize,
    height: c.popoverArrowSize,
    marginTop: -c.popoverArrowSize,
    position: 'absolute',
    overflow: 'hidden'
  },

  arrowInner: {
    background: c.popoverBG,
    width: c.popoverArrowSize,
    height: c.popoverArrowSize,
    position: 'absolute',
    left: 0,
    top: 19,
    borderRadius: 3,
    transform: 'rotate(45deg)'
  },

  item: {
    minWidth: 120,
    borderTop: c.popoverItemBorder,
  },

  itemFirstChild: {
    borderTop: 'none'
  }
});