var React = require('react');

// todo: make this work with mounted depth?
// todo: make this work with react router depth?

module.exports = {
  isView: true,

  componentWillMount() {
    this.addStyles({
      zIndex: this.getLayer()
    });
    console.log(this.styles);
  }
};