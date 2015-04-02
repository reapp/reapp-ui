var React = require('react');
var Component = require('../component');
var { hexToRGBA } = require('../lib/ConstantsHelpers');

module.exports = Component({
  name: 'Dots',

  propTypes: {
    total: React.PropTypes.number.isRequired,
    active: React.PropTypes.number.isRequired
  },

  componentWillMount() {
    this.dotProps = this.componentProps('dot');
  },

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.total !== this.props.total ||
      nextProps.active !== this.props.active
    );
  },

  render() {
    var { total, active, color, ...props } = this.props;

    if (color) {
      this.addStyles('dotInactive', { background: hexToRGBA(color, 0.2) });
      this.addStyles('dotActive', { background: color });
    }

    var dots = [];

    for (let i = 0; i < total; i++) {
      dots.push(
        <div {...this.componentProps(i === active ? 'dotActive' : 'dotInactive')} key={i} />
      );
    }

    return (
      <div {...this.componentProps()} {...props}>
        <div {...this.componentProps('inner')}>
          {dots}
        </div>
      </div>
    );
  }
});