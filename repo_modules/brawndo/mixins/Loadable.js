var createMixin = require('../lib/createMixin');

var Loadable = module.exports = createMixin({
  name: 'Loadable',
  state: {
    loading: undefined,
  },
  actions: {
    load() {
      return this.setState({loading: 'loading'});
    },

    loadSuccess() {
      return this.setState({loading: 'loaded'});
    },

    loadFail() {
      return this.setState({loading: 'failed'});
    }
  }
});
