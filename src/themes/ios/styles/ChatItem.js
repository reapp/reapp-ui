module.exports = (c) => ({
  self: {
    listStyle: 'none',
    padding: '10px',
    margin: '0 0 10px 0',
    overflow: 'hidden',
    flexFlow: 'row',
    WebkitFlexFlow: 'row',
    alignItems: 'center',
    background: '#999',
    color: '#fff',
    borderRadius: '10px',
    width: '80%'
  },

  own: {
    backgroundColor: c.brandColor,
    alignSelf: 'flex-end',
    WebkitAlignSelf: 'flex-end'
  }
});