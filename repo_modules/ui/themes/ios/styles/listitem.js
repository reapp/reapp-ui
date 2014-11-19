module.exports = {
  self: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    flexFlow: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
    borderTop: '1px solid #c8c7cc',
    position: 'relative'
  },

  firstChild: {
    border: 'none'
  },

  wrapper: {
    position: 'absolute',
    top: 0,
    left: -10,
    right: 0,
    bottom: 0,
    maxWidth: 'none',
    flexFlow: 'row',
    justifyContent: 'flex-end'
  },

  arrow: {
    margin: 'auto 8px auto 0'
  },

  before: {
    flexShrink: 0,
    flexWrap: 'nowrap',
    margin: '0 10px 0 0'
  },

  after: {
    color: '#999',
    flexShrink: 0,
    margin: 'auto 10px',
    whiteSpace: 'nowrap',
    alignSelf: 'stretch'
  },

  content: {
    flexShrink: 1,
    flexGrow: 10,
    color: '#000',
    padding: '10px 10px 10px 0',
    position: 'relative'
  },

  titleTop: {
    flexFlow: 'row',
    justifyContent: 'space-between'
  },

  title: {
    fontWeight: '500',
  },

  titleAfter: {
    color: '#999'
  },

  titleSub: {
    fontSize: '15px'
  },

  children: {
    maxHeight: 42,
    fontSize: '15px',
    lineHeight: '21px',
    overflow: 'hidden',
    WebkitLineLamp: 2,
    WebkitBoxOrient: 'vertical',
  }
};