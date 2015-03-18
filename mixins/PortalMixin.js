var React = require('react');
var Theme = require('../helpers/Theme');

module.exports = function(Portal) {
  return {
    componentDidMount() {
      this.node = document.createElement('div');
      document.body.appendChild(this.node);
      this._render(this.props, this.node);
    },

    componentWillReceiveProps(nextProps) {
      this._render(nextProps, this.node);
    },

    componentWillUnmount() {
      React.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    },

    _render(props, node) {
      React.render(
        <Theme {...this.context.theme}>
          <Portal {...props} />
        </Theme>
      , node);
    }
  }
};