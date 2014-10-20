var React = require('react/addons');
var Immstruct = require('immstruct');
var UserComponent = require('../components/user/User');
var { FluxMixin, GetStores } = require('../flux/bootstrap');

var UserPage = React.createClass({
  mixins: [FluxMixin],

  statics: {
    getAsyncProps: (params) => GetStores(params, ['user'])
  },

  render() {
    var structure = Immstruct({
      user: this.props.user && this.props.user.length ?
        this.props.user[0].data :
        null
    });

    window.structure2 = structure;
    structure.on('next-animation-frame', this.forceUpdate);
    return UserComponent(structure.cursor());
  }
});

module.exports = UserPage;