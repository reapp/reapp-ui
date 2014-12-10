var Axn = require('axn');

module.exports = {
  componentWillMount() {
    this.animateEmitter = Axn();
  }

  animate(props) {
    this.animateEmitter()
  }
};