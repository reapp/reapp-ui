module.exports = (c) => ({
  self: {
    fontSize: '16px',
    background: 'none',
    border: `1px solid ${c.blue}`, // todo: variables
    borderRadius: '5px',
    textAlign: 'center',
    padding: '8px',
    color: c.blue,
    flexFlow: 'row',
    zoom: 1,
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    cursor: 'pointer',
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none',
    outline: 'none'
  },

  borderless: {
    border: 'none',
    borderRadius: 0
  }
});