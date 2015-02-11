var React = require('react/addons');
var Component = require('../component');

// todo: this is unfinished

module.exports = Component({
  name: 'CardList',

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});