var { Page } = require('carpo');
var Articles = require('../components/articles/Articles');
var Brawndo = require('brawndo');

module.exports = Page({
  displayName: 'Articles',
  mixins: [Brawndo.FluxMixin],

  getDefaultProps: params => ({
    articles: Brawndo.StoreLoader('Articles'),
    views: [
      {
        id: 'hot',
        title: 'Hot',
        content: null
      },
      {
        id: 'top',
        title: 'Top',
        content: null
      }
    ]
  }),

  render: cursor => Articles('Articles', cursor)
});