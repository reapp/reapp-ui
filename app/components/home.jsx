var React = require('react');
var ReactRouter = require('react-router');
var Reqwest = require('reqwest');
var ImageBox = require('./home/image_box_component');
var Toolbar = require('./ui/toolbar');

module.exports = React.createClass({

  statics: {
    title: 'Home',

    didTransitionTo(params, query, setProps) {
      new Reqwest({
        url: 'http://localhost:3000/articles.json',
        type: 'jsonp'
      }).then(function(data) {
        setProps({ articles: data })
      })
    },

    shouldRenderWithProps(props) {
      return !!props.articles;
    }
  },

  render() {
    console.log('props', this.props)

    return (
      <div id="HomePage">
        <Toolbar>
          Title
        </Toolbar>
        <ImageBox images={this.props.articles} />
      </div>
    );
  }

});