/** @jsx React.DOM */
var ReactorPage = require('reactor-core').page;
var Superagent = require('superagent');
var ImageBox = require('./home/image_box_component');

module.exports = ReactorPage.createClass({

  title: 'Home',

  getProps: function(cb, props) {
    Superagent
      .get('http://localhost:3000/articles.json')
      .end(function(err, res) {
        cb(err, { articles: res.body });
      });
  },

  render: function() {
    return (
      <div id="HomePage">
        <ImageBox images={this.props.data.articles} />
      </div>
    );
  }

});