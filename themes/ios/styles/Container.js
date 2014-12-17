module.exports = {
  self: {
    margin: '10px -10px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    WebkitFlexDirection: 'row',
    flexWrap: 'wrap',
    WebkitFlexWrap: 'wrap'
  },

  // todo
  '@media (max-width: 768px)': {
    children: {
      flexFlow: 'column',
      WebkitFlexFlow: 'column',
    }
  }
};