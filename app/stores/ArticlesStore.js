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

  // actions attached here run *before* the mixins
  mixins: [
    Immutable(),
    Brawndo.Mixins.Loadable({
      loadSuccess() {
        this.state.data.set('articles', this.immute(this.payload));
      },

      loadFail(error) {
        this.setState({ data: undefined, error: error });
      }
    }),

    // Offlinable,
    // Swarmable
  ],

  actions: {
    // actions here will run *after* the mixins
    loadFail: res => res.setState({ something: 'else' }),
    loadArticle: res => res.cursor()
  }
});