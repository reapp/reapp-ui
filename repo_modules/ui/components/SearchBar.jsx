var Component = require('ui/component');

module.exports = Component({
  name: 'SearchBar',

  render() {
    var { barProps, ...props } = this.props;

    return (
      <div {...barProps} {...this.componentProps()}>
        <input {...props}
          type="search" />
      </div>
    );
  }
});