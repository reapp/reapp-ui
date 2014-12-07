module.exports = {
  self: {
    margin: '10px -10px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  // todo
  '@media (max-width: 768px)': {
    children: {
      flexFlow: 'column'
    }
  }
};