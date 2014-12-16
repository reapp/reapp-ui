module.exports = (c) => ({
  self: {
    border: `1px solid ${c.buttonBG}`, // todo: variables
    color: c.buttonBG,
    fontSize: '16px',
    background: 'none',
    borderRadius: '5px',
    textAlign: 'center',
    padding: '8px',
    zoom: 1,
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    cursor: 'pointer',
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none',
    outline: 'none',
    flexFlow: 'row',
    WebkitFlexFlow: 'row'
  },

  chromeless: {
    border: 'none',
    borderRadius: 0
  },

  rounded: {
    borderRadius: '100px'
  },

  active: {
    background: c.buttonBG,
    color: c.buttonActiveColor
  }
});