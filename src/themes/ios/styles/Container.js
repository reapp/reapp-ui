module.exports = {
  self: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    WebkitFlexDirection: 'row',
    flexWrap: 'wrap',
    WebkitFlexWrap: 'wrap'
  },

  col: {
    flexDirection: 'column',
    WebkitFlexDirection: 'column'
  },

  // todo
  '@media (max-width: 768px)': {
    children: {
      flexFlow: 'column',
      WebkitFlexFlow: 'column',
    }
  }
};