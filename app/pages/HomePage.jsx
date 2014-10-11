var React = require('react');
var { Link } = require('react-router');
var View = require('../components/ui/views/View');
var TitleBar = require('../components/TitleBar');

module.exports = React.createClass({
  title: 'Home',

  statics: {
    didTransitionTo(params, query, setProps) {
      var articles = [];
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
    return (
      <View id="HomePage">
        <TitleBar>{this.title}</TitleBar>
        hello
      </View>
    );
  }

});