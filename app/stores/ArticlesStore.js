var Brawndo = require('brawndo');
var _ = require('lodash-node');

var Loadable = Brawndo.createMixin({
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

var Reducable = Brawndo.createMixin({
  name: 'Reducable',
  state: {
    data: {},
  },
  actions: {
    reducePayload: res => res.setState({
      data: [].concat(res.payload).reduce(this.reducer, {})
    })
  },
  reducer: (acc, item) => {
    var clientId = _.uniqueId();
    acc[clientId] = { id: clientId, data: item, status: 'OK' };
    return acc;
  }
});

// all actions done in mixins or 'actions' are automatically prefixed
// to the name of the store, so actions like load become Articles:load
// TODO: allow unprefixed actions, maybe in { actions: externals: {} }

var Store = Brawndo.createStore({
  name: 'Articles',
  state: {
    data: {}
  },
  mixins: [
    // actions attached here run *before* the mixins
    Loadable({
      loadFail: res => res.setState({data:undefined, error:res.error})
    }),
    Reducable({
      loadSuccess: res => res.reducePayload(res)
    })
  ],
  actions: {
    // actions here will run *after* the mixins
    loadFail: res => res.setState({something:'else'}),
    test: function() {}
  },
});

module.exports = {
  getFlux() {
    return Store;
  }
};