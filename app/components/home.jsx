var React = require('react');
var ReactRouter = require('react-router');
var Reqwest = require('reqwest');
var ImageBox = require('./home/image_box_component');
var Toolbar = require('./ui/toolbar');
var ReactCursor = require('react-cursor');

var Cursor = ReactCursor.Cursor;

module.exports = React.createClass({

  statics: {
    didTransitionTo(params, query, setProps) {
      new Reqwest({
        url: 'http://localhost:3000/articles.json',
        type: 'jsonp'
      }).then(function(data) {
        setProps({ data: { articles: data } })
      })
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
    var images = cursor.refine('articles').value.map(function(x) {
      return x.image_url;
    });

    return (
      <div id="HomePage">
        <Toolbar>
          Title
        </Toolbar>
        <ImageBox images={images} />
      </div>
    );
  }

});