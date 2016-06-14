export default c => ({
  self: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2,
    transform: 'translateZ(0)',
    WebkitOverflowScrolling: 'touch'
  },

  inactive: {
    pointerEvents: 'none'
  },

  inner: {
    background: c.viewBG,
    zIndex: 1,
    flex: 1,
    height: '100%',
    position: 'relative'
  },

  static: {
    padding: '0px 8px',
    flex: 1
  },

  plain: {
    padding: 0
  },

  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    background: '#000',
    pointerEvents: 'none'
  },

  shadow: {
    position: 'absolute',
    top: 0,
    bottom: -88,
    left: -16,
    width: 16,
    background: 'linear-gradient(to right,rgba(0,0,0,0) 0,rgba(0,0,0,0) 10%,rgba(0,0,0,.01) 50%,rgba(0,0,0,.2) 100%)',
    zIndex: -1,
  }
});
