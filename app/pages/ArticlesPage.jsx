var React = require('react');
var Articles = require('../components/articles/Articles');
var Brawndo = require('brawndo');
var ImmstructPropsMixin = require('carpo/ImmstructPropsMixin');

var Immstructable = ImmstructPropsMixin({
  props: ['articles'],
  onSwap(key, newStruct) {
    debugger;
    Brawndo.getStore('Articles').setData('articles', newStruct.cursor());
  }
});

module.exports = React.createClass({
  mixins: [Immstructable, Brawndo.FluxMixin],

  statics: {
    fetchData: params => Brawndo.StoreLoader('Articles').then(res => {
      return {
        data: res.get('articles'),
        views: [
          { id: 'hot', title: 'Hot', content: null },
          { id: 'top', title: 'Top', content: null }
        ]
      }
    })
  },

  render() {
    console.log('render', this.structures, this.props);

    return Articles('Articles', {
      data: this.structures.data.cursor(),
      views: this.structures.views.cursor()
    });
  }
});