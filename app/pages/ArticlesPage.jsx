var React = require('react');
var Articles = require('../components/articles/Articles');
var Brawndo = require('brawndo');
var ImmstructPropsMixin = require('carpo/ImmstructPropsMixin');

module.exports = React.createClass({
  mixins: [ImmstructPropsMixin('articles'), Brawndo.FluxMixin],

  statics: {
    fetchData: params => Brawndo.StoreLoader('Articles').then(res => ({
      data: res.get('articles'),
      views: [
        { id: 'hot', title: 'Hot', content: null },
        { id: 'top', title: 'Top', content: null }
      ]
    }))
  },

  render() {
    console.log('render', this.structures, this.props);
    var articles = this.structures.articles;
    if (!articles) return <span />;
    return Articles('Articles', articles.cursor());
  }
});