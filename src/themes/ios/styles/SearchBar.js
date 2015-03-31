module.exports = (c) => ({
  self: {
    height: c.searchBarHeight,
    background: c.searchBarBG,
    padding: '0 8px',
    margin: `0 -${c.viewPad}`,
    borderBottom: `${c.onePx} solid ${c.searchBarBorderColor}`,
    alignItems: 'center'
  },

  inner: {
    width: '100%',
    height: 28,
    flexShink: 1,
    margin: '7px 0'
  },

  input: {
    border: 'none',
    width: '100%',
    height: '100%',
    display: 'block',
    appearance: 'none',
    borderRadius: 5,
    fontSize: '14px',
    fontWeight: 400,
    padding: '0 28px'
  }
});