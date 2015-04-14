export default c => ({
  self: {
    padding: '10px',
    margin: '5px 0',
    flexFlow: 'row',
    WebkitFlexFlow: 'row',
    alignItems: 'center',
    background: c.chatItemBG,
    color: c.chatItemColor,
    borderRadius: '10px',
    width: '80%',
    position: 'relative'
  },

  inner: {
    overflow: 'hidden'
  },

  own: {
    backgroundColor: c.chatItemOwnBG,
    alignSelf: 'flex-end',
    WebkitAlignSelf: 'flex-end'
  },

  arrow: {
    position: 'absolute',
    zIndex: 1,
    bottom: '0',
    left: '-7px',
    borderRadius: '20px / 10px',
    border: '8px solid transparent',
    borderBottomColor: c.chatItemBG,
  },

  arrowOwn: {
    left: 'auto',
    right: '-7px',
    borderBottomColor: c.chatItemOwnBG
  }
});