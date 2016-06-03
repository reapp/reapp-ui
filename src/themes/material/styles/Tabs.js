module.exports = (c) => ({
  self: {
    flex: '1 1 auto',
    background: 'rgb(0, 188, 212)'
  },
  inner: {
    WebkitFlexFlow: 'row',
    flexFlow: 'row',
    flex: '1 1 100%',
    background: 'rgb(0, 188, 212)',
    minHeight: '48px'
  },
  inkBar: {
    position: 'relative',
    display: 'block',
    bottom: '0px',
    height: '2px',
    marginTop: '-2px',
    transition: 'left 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    backgroundColor: 'rgb(255, 64, 129)'
  }
});