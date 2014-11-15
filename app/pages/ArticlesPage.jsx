var { Page } = require('carpo');
var Brawndo = require('brawndo');
var Articles = require('../components/articles/Articles');

var ArticlesPage = Page('articles', [Brawndo.FluxMixin], {
  cursors: ['data', 'views'],

  getDefaultProps: () => ({
    views: [
      { id: 'hot', title: 'Hot', content: null },
      { id: 'top', title: 'Top', content: null }
    ]
  }),

  fetchData: params =>
    Brawndo.StoreLoader('Articles').then(res => res.get('articles')),

  onDataChange: (key, newStruct) => (
    key === 'data' &&
    Brawndo.getStore('Articles').setData('articles', newStruct.cursor())
  ),

  render: props => Articles('articles', props)
});

  module.exports = ArticlesPage;