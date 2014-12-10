var Component = require('ui/component');

module.exports = Component({
  name: 'Badge',

  render() {
    var { children, value, ...props } = this.props;

    return (
      <div {...props} {...this.componentProps()}>
        <span {...this.componentProps('text')}>
          {value || children}
        </span>
      </div>
    );
  }
});