module.exports = (c) => ({
  self: {
    border: `1px solid ${c.buttonBorderColor}`, // todo: variables
    color: c.buttonColor,
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
    WebkitFlexFlow: 'row',
    flexGrow: 1,
    WebkitFlexGrow: 1
  },

  isInTitleBar: {
    color: c.buttonColorTitleBar
  },

  chromeless: {
    border: 'none',
    borderRadius: 0
  },

  rounded: {
    borderRadius: '100px'
  },

  active: {
    background: c.buttonActiveBG,
    color: c.buttonActiveColor
  }
});