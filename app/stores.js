var Component = require('component');
var { createStore } = require('fynx');
var { List } = require('immutable');

Component.addStatics({
  stores: {
    ArticlesStore: createStore(),
    HotArticlesStore: createStore(List()),
    UsersStore: createStore(List())
  }
});