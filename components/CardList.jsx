var React = require('react/addons');
var { Scroller } = require('scroller');
var Component = require('../component');
var TouchableArea = require('../helpers/TouchableArea');

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