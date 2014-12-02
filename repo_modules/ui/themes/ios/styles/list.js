module.exports = (c) => ({
  self: {
    background: '#fff',
    borderTop: `1px solid ${c.listItemBorderColor}`,
    borderBottom: `1px solid ${c.listItemBorderColor}`,
    margin: '0 -10px',
    padding: '0 0 0 10px',
    zIndex: 101,
    fontSize: '16px'
  },

  inset: {
    margin: 20,
    borderRadius: 10,
    border: 'none'
  },

  title: {
    background: c.listTitleColor,
    padding: '4px 0 4px 10px',
    margin: '0 0 -1px -10px',
    color: '#8e8e93',
    zIndex: 100
  }
});