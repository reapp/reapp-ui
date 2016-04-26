module.exports = (c) => ({
  self: {
    border: c.listBorder,
    background: c.listBG,
    padding: 0,
    float: 'left',
    marginBottom: '24px',
    marginRight: '24px',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    borderRadius: '2px',
    padding: '8px 0 8px 0'
  },

  'type-inset': {
    margin: 20,
    borderRadius: 10,
    border: 'none'
  },

  title: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '48px',
    padding: '0 0 0 16px',
    margin: '-8px 0 0 0'
  }
});