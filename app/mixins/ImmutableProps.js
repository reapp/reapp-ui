var Fynx = require('fynx');
var Immutable = require('immutable');

module.exports = function(propKeys) {
  return {
    componentWillMount() {
      this.stores = {};
      this.makeStores(this.props);
    },

    componentWillReceiveProps(nextProps) {
      this.makeStores(nextProps);
    },

    componentWillUnmount() {
      propKeys.forEach(key =>
        this.stores[key].unlisten(this.forceUpdate));
    },

    makeStores(props) {
      propKeys.forEach(key => {
        var prop = props[key];
        // allow nested keys
        if (!prop && (Array.isArray(key) || key.indexOf('.'))) {
          prop = key.split('.')
            .reduce((acc, key) => acc[key], Object.assign({}, props));
        }

        if (this.stores[key]) return;
        this.stores[key] = Fynx.createStore(Immutable.fromJS(prop));
        this.stores[key].listen(() => {
          // if (this.isMounted()){
          //   debugger;
          //   this.forceUpdate();
          // }
        });
      });
    },

    getImmutableProps() {
      return propKeys.reduce((acc, key) => {
        acc[key] = this.stores[key]();
        return acc;
      }, {});
    }
  };
};