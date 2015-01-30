var React = require('react');

module.exports = function(node) {
  return {
    propTypes: {
      scrollTop: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
      ])
    },

    getDefaultProps() {
      return {
        scrollTop: 0
      };
    },

    componentDidMount() {
      this.setScrollTop(this.props);
    },

    componentWillReceiveProps(nextProps) {
      if (nextProps.scrollTop !== this.props.scrollTop)
        this.setScrollTop(nextProps);
    },

    setScrollTop(props) {
      if (!props.scrollTop)
        return;

      var scrollTop = props.scrollTop;
      if (typeof props.scrollTop === 'string')
        scrollTop = this.getConstant(props.scrollTop);

      this.refs[node].getDOMNode().scrollTop = scrollTop;
    }
  }
};