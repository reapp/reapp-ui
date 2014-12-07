require('es-object-assign');
var Component = require('component');

Component.addStatics({
  helpers: {
    storePromise: require('./helpers/storePromise')
  },
  mixins: {
    storeListener: require('./mixins/storeListener')
  },
  actions: require('../actions/Actions'),
  stores: {
    ArticlesStore: require('../stores/ArticlesStore'),
    HotArticlesStore: require('../stores/HotArticlesStore'),
    UsersStore: require('../stores/UsersStore')
  }
});