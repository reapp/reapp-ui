var React = require('react');
var Component = require('ui/component');

module.exports = Component({
  name: 'Dots',

  propTypes: {
    total: React.PropTypes.number.isRequired,
    active: React.PropTypes.number.isRequired
  },

  render() {
    var { total, active, ...props } = this.props;

    var dots = Array.apply(null, new Array(total)); // this sucks

    var dotProps = this.componentProps('dot');
    var activeDotProps = Object.assign({}, this.componentProps('dotActive'));
    activeDotProps.styles.unshift(this.getStyles('dot'));

    return (
      <div {...props} {...this.componentProps()}>
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