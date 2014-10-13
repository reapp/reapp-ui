var React = require('react');
var { Cursor } = require('react-cursor');
var { Link } = require('react-router');
var View = require('../components/ui/views/View');
var ImageRoll = require('../components/image_roll/ImageRoll');
var TitleBar = require('../components/TitleBar');

module.exports = React.createClass({
  title: 'Image Roll',

  statics: {
    didTransitionTo(params, query, setProps) {
      var articles = [{"id":2,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.648Z","updated_at":"2014-09-03T06:22:37.648Z","image_url":"140043912_1_2.jpg"},{"id":3,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.657Z","updated_at":"2014-09-03T06:22:37.657Z","image_url":"140043912_2_2.jpg"},{"id":4,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.660Z","updated_at":"2014-09-03T06:22:37.660Z","image_url":"140043912_3_2.jpg"},{"id":5,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.662Z","updated_at":"2014-09-03T06:22:37.662Z","image_url":"140043912_4_2.jpg"},{"id":6,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.666Z","updated_at":"2014-09-03T06:22:37.666Z","image_url":"140043912_5_2.jpg"},{"id":7,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.669Z","updated_at":"2014-09-03T06:22:37.669Z","image_url":"140043912_6_2.jpg"},{"id":8,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.671Z","updated_at":"2014-09-03T06:22:37.671Z","image_url":"140043912_7_2.jpg"},{"id":9,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.675Z","updated_at":"2014-09-03T06:22:37.675Z","image_url":"140043912_8_2.jpg"},{"id":10,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.678Z","updated_at":"2014-09-03T06:22:37.678Z","image_url":"140043912_9_2.jpg"},{"id":11,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.681Z","updated_at":"2014-09-03T06:22:37.681Z","image_url":"140043912_10_2.jpg"},{"id":12,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.691Z","updated_at":"2014-09-03T06:22:37.691Z","image_url":"140043912_11_2.jpg"},{"id":13,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.695Z","updated_at":"2014-09-03T06:22:37.695Z","image_url":"140043912_12_2.jpg"},{"id":14,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.698Z","updated_at":"2014-09-03T06:22:37.698Z","image_url":"140043912_13_2.jpg"},{"id":15,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.701Z","updated_at":"2014-09-03T06:22:37.701Z","image_url":"140043912_14_2.jpg"},{"id":16,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.704Z","updated_at":"2014-09-03T06:22:37.704Z","image_url":"140043912_15_2.jpg"},{"id":17,"content":null,"title":null,"created_at":"2014-09-03T06:22:37.706Z","updated_at":"2014-09-03T06:22:37.706Z","image_url":"140043912_16_2.jpg"}];
      setProps({ data: { articles: articles }});
    },

    shouldRenderWithProps(props) {
      return !!props.data;
    }
  },

  getInitialState() {
    return this.props.data;
  },

  render() {
    var cursor = Cursor.build(this);
    var articles = cursor.refine('articles').value;
    var images = articles.map(a =>  a.image_url);

    return (
      <View id="ImageRoll">
        <TitleBar>{this.title}</TitleBar>
        <ImageRoll images={images} />
      </View>
    );
  }

});