var Brawndo = require('brawndo');

// all actions done in mixins or 'actions' are automatically prefixed
// to the name of the store, so actions like load become Articles:load
// TODO: allow unprefixed actions, maybe in { actions: externals: {} }

var Immutable = Brawndo.createMixin({
  name: 'Immutable',
  expose: {
    immutePayload: res => res.setPayload(res.payload)
  }
});


Brawndo.createStore({
  name: 'Articles',

  state: {
    data: {}
  },

  mixins: [
    // actions attached here run *before* the mixins
    Brawndo.Mixins.Reducable({
      loadSuccess: res => res.reducePayload(res)
    }),
    Immutable({
      loadSuccess: res => res.immutePayload(res)
    }),
    Brawndo.Mixins.Loadable({
      loadSuccess: res => res.setState({data: res.payload}),
      loadFail: res => res.setState({data:undefined, error:res.error})
    })
  ],

  actions: {
    // actions here will run *after* the mixins
    loadFail: res => res.setState({something:'else'})
  }
});