module.exports = (c) => ({
  self: {
    height: '44px',
    borderWidth: c.onePx,
    borderColor: c.modalBorderColor,
    borderBottom: 'none',
    borderTop: 'none',
    borderRight: 'none',
    flexGrow: 1,
    WebkitFlexGrow: 1,
    borderRadius: 0
  },

  firstChild: {
    borderLeft: 'none'
  },

  confirm: {
    fontWeight: 700
  }
});