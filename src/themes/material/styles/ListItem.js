module.exports = (c) => ({
  self: {
    position: 'relative',
    background: c.listBG,
    listStyle: 'none',
    margin: 0,
    overflow: 'hidden',
    flexFlow: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
    transition: 'background linear 50ms',
    cursor: 'pointer'
  },

  touchRipple: {
    position: 'relative',
    padding: '16px 56px 16px 72px',
    background: c.listBG,
    listStyle: 'none',
    margin: 0,
    overflow: 'hidden',
    flexFlow: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
    transition: 'background linear 50ms'
  },

  selfNoPadLeft: {
    paddingLeft: 0
  },

  selfNoPadRight: {
    paddingRight: 0
  },

  tapActive: {
    background: '#f2f2f2'
  },

  borderless: {
    borderTop: 'none'
  },

  arrow: {
    margin: 'auto 8px auto 0',
    color: '#cfcfcf'
  },

  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    maxWidth: 'none',
    flexFlow: 'row',
    justifyContent: 'flex-end',
    zIndex: 1
  },

  wrapperPadRight: {
    paddingRight: '20px'
  },

  wrappedPad: {
    padding: '0 0 0 16px'
  },

  before: {
    position: 'absolute',
    left: '4px',
    top: '8px',
    flexFlow: 'row',
    justifyContent: 'center',
    flexShrink: 0,
    flexWrap: 'nowrap',
    padding: '0 0 0 12px',
    margin: '0 0 0 0'
  },

  content: {
    padding: '0 16px 0 16px',
    flexShrink: 1,
    flexGrow: 800,
    color: c.listItemContentColor,
    position: 'relative'
  },

  contentNoPad: {
    padding: 0
  },

  titleTop: {
    flexFlow: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%'
  },

  title: {
    lineHeight: '16px',
    fontWeight: 500,
    maxWidth: '100%'
  },

  titleAfter: {
    color: c.listItemTitleAfterColor,
    fontSize: '15px',
    padding: 0
  },

  titleSub: {
    lineHeight: '16px',
    margin: '4px 0 0 0',
    fontSize: '15px',
    fontWeight: 400,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    minWidth: 0,
    display: 'block',
    overflow: 'hidden'
  },

  children: {
    maxHeight: 42,
    fontSize: '15px',
    lineHeight: '22px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  fulltext: {
    maxHeight: 'none'
  },

  childrenNoTitle: {
    fontSize: '17px',
    paddingRight: 10
  },

  after: {
    position: 'absolute',
    right: '16px',
    top: '8px',
    color: c.listItemAfterColor,
    flexShrink: 0,
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    alignSelf: 'stretch',
  }

});
