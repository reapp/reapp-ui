var React = require('react');
var Component = require('../component');

module.exports = Component({
  name: 'SearchBar',

  render() {
    var { barProps, ...props } = this.props;

    return (
      <div {...this.componentProps()} {...barProps}>
        <div {...this.componentProps('inner')}>
          <input {...this.componentProps('input')} {...props}
            type="search" />
        </div>
      </div>
    );
  }
});