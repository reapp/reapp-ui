var { Page } = require('carpo');
var Brawndo = require('brawndo');
var Articles = require('../components/articles/Articles');

var ArticlesPage = Page('articles', [Brawndo.FluxMixin], {
  fetchData: params => Brawndo.StoreLoader('Articles').then(res => ({
    data: res.get('articles'),
    views: [
      { id: 'hot', title: 'Hot', content: null },
      { id: 'top', title: 'Top', content: null }
    ]
  }),

  onSwap: (key, newStruct) => (
    key === 'data' &&
    Brawndo.getStore('Articles').setData('articles', newStruct.cursor())
  ),

  render: props => Articles('articles', props)
});

  module.exports = ArticlesPage;