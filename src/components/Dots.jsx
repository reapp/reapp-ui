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

  componentWillMount() {
    this.cProps = {
      dot: this.componentProps('dot'),
      active: Object.assign({}, this.componentProps('dotActive'))
    };

    this.cProps.active.styles.unshift(this.getStyles('dot'));
  },

  render() {
    var { total, active, ...props } = this.props;

    var dots = [];

    for (let i = 0; i < total; i++) {
      dots.push(i === active ?
        <div {...this.cProps.active} key={i} /> :
        <div {...this.cProps.dot} key={i} />
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