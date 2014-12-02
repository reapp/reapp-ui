var React = require('react');

module.exports = {
  getLayer() {
    return this._mountDepth * 100 + (this.props.index || 0) * 10;
  }
};