module.exports = {
  self: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    visibility: 'hidden',
    zIndex: -1,
    background: 'rgba(0,0,0,0.3)',
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
    background: 'rgba(255,255,255,0.95)',
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
    width: 26,
    height: 26,
    top: -26,
    left: '50%',
    marginLeft: '-13px',
    position: 'absolute',
    overflow: 'hidden'
  },

  arrowInner: {
    background: 'rgba(255,255,255,0.95)',
    width: 26,
    height: 26,
    position: 'absolute',
    left: 0,
    top: 19,
    borderRadius: 3,
    transform: 'rotate(45deg)'
  },

  item: {
    minWidth: 120,
    borderTop: '1px solid #ccc',
  },

  itemFirstChild: {
    borderTop: 'none'
  }
};