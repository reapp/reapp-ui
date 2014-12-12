var Component = require('ui/component');

module.exports = Component({
  name: 'SearchBar',

  render() {
    var { barProps, ...props } = this.props;

    return (
      <div {...this.componentProps()} {...barProps}>
        <input {...props}
          type="search" />
      </div>
    );
  }
});