module.exports = {
  handleViewEnter(index) {
    this.props.cursor.get(['views', index]).update('content', content => {
      return 'Loading...';
    });
  },
  handleViewLeave(i) {
    console.log('VIEW LEAVE', arguments);
  }
};