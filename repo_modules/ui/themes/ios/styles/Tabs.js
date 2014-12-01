module.exports = (vars) => ({
  self: {
    background: vars.tabsBG,
    height: vars.tabsHeight,
    lineHeight: vars.tabsLineHeight,
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