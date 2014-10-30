module.exports = {
  // todo have this push "loading...", then have it "undo" once entered
  handleViewEnter(index) {
    this.props.cursor.get(['views', index]).update('content', content => {
      return 'Loading...';
    });
  },

  handleViewLeave(i) {
    console.log('VIEW LEAVE', arguments);
  }
};