var React = require('react');
var { Link } = require('react-router');
var View = require('../components/ui/views/View');
var AppLayout = require('../components/layout/AppLayout');

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
      <AppLayout title={this.title}>
        <View id="HomePage">
          hello
        </View>
      </AppLayout>
    );
  }

});