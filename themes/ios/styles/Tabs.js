module.exports = (c) => ({
  self: {
    background: c.tabsBG,
    height: c.tabsHeight,
    lineHeight: c.tabsLineHeight,
    borderTop: `1px solid ${c.tabsBorderColor}`,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    flexFlow: 'row',
    margin: 0,
    padding: 0,
    justifyContent: 'space-between',
    alignContent: 'stretch',
    textAlign: 'center'
  }
});