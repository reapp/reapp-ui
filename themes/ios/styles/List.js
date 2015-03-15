module.exports = (c) => ({
  self: {
    borderTop: `${c.onePx} solid ${c.listItemBorderColor}`,
    borderBottom: `${c.onePx} solid ${c.listItemBorderColor}`,
    background: c.listBG,
    margin: '0 -10px',
    padding: 0,
    fontSize: '16px'
  },

  'type-inset': {
    margin: 20,
    borderRadius: 10,
    border: 'none'
  },

  title: {
    position: '-webkit-sticky',
    top: 0,
    background: '#f5f5f5',
    color: '#7b7b80',
    fontWeight: 500,
    padding: '4px 0 4px 10px',
    margin: '0 0 -1px 0',
    zIndex: 1000
  }
});