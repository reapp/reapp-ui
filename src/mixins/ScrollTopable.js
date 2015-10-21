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

    getScrollTop() {
      return typeof this.props.scrollTop === 'string' ?
        this.getConstant(this.props.scrollTop) :
        this.props.scrollTop || 0;
    },

    setScrollTop(props) {
      if (!props.scrollTop)
        return;

      this.refs[node].getDOMNode().scrollTop = this.getScrollTop();
    }
  }
};