var React = require('react');
var Component = require('ui/component');

module.exports = Component({
  name: 'Badge',

  propTypes: {

  }

  render() {
    var { children, value, ...props } = this.props;

    return (
      <div {...this.componentProps()} {...props}>
        <span {...this.componentProps('text')}>
          {value || children}
        </span>
      </div>
    );
  }
});