var createMixin = require('../lib/createMixin');

var Loadable = module.exports = createMixin({
  name: 'Loadable',
  state: {
    loading: undefined,
  },
  actions: {
    load: res => res.setState({loading: 'loading'}),
    loadSuccess: res => res.setState({loading: 'loaded'}),
    loadFail: res => res.setState({loading: 'failed'})
  }
});
