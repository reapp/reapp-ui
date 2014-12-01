module.exports = (vars) => ({
  self: {
    background: vars.toolbarColor,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 49,
    lineHeight: '49px',
    flexFlow: 'row',
    margin: 0,
    padding: 0,
    justifyContent: 'space-between',
    alignContent: 'stretch',
    textAlign: 'center'
  }
});