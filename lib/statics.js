require('es-object-assign');
var Component = require('component');

Component.addStatics({
  helpers: {
    storePromise: require('./helpers/storePromise')
  },
  mixins: {
    storeListener: require('./mixins/storeListener')
  },
  actions: require('../app/actions/Actions'),
  stores: {
    ArticlesStore: require('../app/stores/ArticlesStore'),
    HotArticlesStore: require('../app/stores/HotArticlesStore'),
    UsersStore: require('../app/stores/UsersStore')
  }
});