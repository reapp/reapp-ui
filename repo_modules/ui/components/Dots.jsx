var React = require('react');
var Component = require('ui/component');

module.exports = Component('Dots', {
  propTypes: {
    total: React.PropTypes.number.isRequired,
    active: React.PropTypes.number.isRequired
  },

  render() {
    var { total, active, ...props } = this.props;
    var dots = new Array(total);
    var dotProps = this.componentProps('dot');
    var activeDotProps = [dotProps].concat(this.getStyles('dotActive'));

    return (
      <div {...props} {...this.componentProps()}>
        {dots.map((dot, i) => (
          i == active ?
            <div {...activeDotProps} /> :
            <div {...dotProps} />
        ))}
      </div>
    );
  }
});