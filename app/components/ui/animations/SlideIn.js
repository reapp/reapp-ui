module.exports = {

  componentWillEnter: function(cb) {
    var time = 1; //seconds
    var el = this.getDOMNode();
    var width = window.innerWidth;
    var height = window.innerHeight;

    var style = {
      position: 'fixed',
      top: 0,
      left: width,
      width: width,
      height: height
    };

    cb();
  },

  componentWillLeave: function(cb) {
    cb();
  }

};