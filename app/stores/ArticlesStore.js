var Brawndo = require('brawndo');
var { Immutable } = require('./StoreMixins');

// all actions done in mixins or 'actions' are automatically prefixed
// to the name of the store, so actions like load become Articles:load
// TODO: allow unprefixed actions, maybe in { actions: externals: {} }

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
      loadSuccess: res => res.setState({ data: res.immute({ articles: res.payload }) })
    }),

    Brawndo.Mixins.Loadable({
      loadFail: res => res.setState({ data: undefined, error: res.error })
    })
  ],

  actions: {
    // actions here will run *after* the mixins
    loadFail: res => res.setState({ something: 'else' })
  }
});