module.exports = (c) => ({
  self: {
    background: c.listBG,
    listStyle: 'none',
    margin: 0,
    padding: '0 0 0 20px',
    overflow: 'hidden',
    flexFlow: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
    position: 'relative',
    transition: 'background linear 50ms'
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

  before: {
    flexShrink: 0,
    flexWrap: 'nowrap',
    margin: '0 12px 0 0'
  },

  content: {
    borderTop: `${c.onePx} solid ${c.listItemBorderColor}`,
    flexShrink: 1,
    flexGrow: 800,
    color: c.listItemContentColor,
    padding: '11px 12px 11px 0',
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
    fontWeight: 500,
    maxWidth: '100%'
  },

  titleAfter: {
    color: c.listItemTitleAfterColor,
    fontSize: '15px'
  },

  titleSub: {
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
    borderTop: `${c.onePx} solid ${c.listItemBorderColor}`,
    color: c.listItemAfterColor,
    flexShrink: 0,
    padding: '0 12px',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    alignSelf: 'stretch',
  }
});
