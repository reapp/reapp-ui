var React = require('react');
var Immstruct = require('immstruct');
var UserComponent = require('../components/user/User');
var { GetStores } = require('../flux/bootstrap');

var User = React.createClass({
  statics: {
    getAsyncProps: (params) => GetStores(params, ['user'])
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.user && nextProps.user[0];
  },

  render() {
    var user = this.props.user ? this.props.user[0] : { id: 0 };
    var structure = Immstruct({
      user: user.data
    });

    structure.on('next-animation-frame', this.forceUpdate);
    return UserComponent(`UserPage-${user.id}`, structure.cursor());
  }
});

module.exports = User;