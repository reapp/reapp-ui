var React = require('react');
var Component = require('../component');

module.exports = Component({
  name: 'Dots',

  propTypes: {
    total: React.PropTypes.number.isRequired,
    active: React.PropTypes.number.isRequired
  },

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.total !== this.props.total ||
      nextProps.active !== this.props.active
    );
  },

  render() {
    var { total, active, ...props } = this.props;

    // is this really how you make a new empty array in js?
    var dots = Array.apply(null, new Array(total));

    var dotProps = this.componentProps('dot');
    var activeDotProps = Object.assign({}, this.componentProps('dotActive'));
    activeDotProps.styles.unshift(this.getStyles('dot'));

    return (
      <div {...this.componentProps()} {...props}>
        <div {...this.componentProps('inner')}>
          {dots.map((dot, i) => (
            i === active ?
              <div {...activeDotProps} key={i} /> :
              <div {...dotProps} key={i} />
          ))}
        </div>
      </div>
    );
  }
});