var React = require('react');
var UserComponent = require('../components/user/User');

var User = React.createClass({
  statics: {
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.user && nextProps.user[0];
  },

  render() {
    if (!this.props.user) return <span />;

    var user = this.props.user ? this.props.user[0] : { id: 0 };

    // structure.on('next-animation-frame', this.forceUpdate);
    return UserComponent(`UserPage-${user.id}`, null);
  }
});

module.exports = User;