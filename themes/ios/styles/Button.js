module.exports = (c) => ({
  self: {
    border: `1px solid ${c.buttonBorderColor}`, // todo: variables
    color: c.buttonColor,
    fontSize: '16px',
    background: 'none',
    borderRadius: '5px',
    textAlign: 'center',
    padding: '8px',
    minHeight: '40px',
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
    flexAlign: 'center',
    WebkitFlexAlign: 'center',
    alignItems: 'center',
    WebkitAlignItems: 'center',
    margin: 0
  },

  inner: {
    margin: 'auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    maxWidth: '100%'
  },

  isInTitleBar: {
    color: c.buttonColorTitleBar
  },

  chromeless: {
    border: 'none',
    borderRadius: 0
  },

  fullscreen: {
    border: 'none',
    borderRadius: 0,
    margin: '0 -20px'
  },

  rounded: {
    borderRadius: '100px'
  },

  active: {
    background: c.buttonActiveBG,
    color: c.buttonActiveColor
  },

  inactive: {
    WebkitFilter: 'grayscale(1)',
    opacity: 0.2,
    pointerEvents: 'none'
  },

  focused: {
    background: c.buttonFocusedBG
  },

  focusedTitleBar: {
    opacity: 0.2
  }
});