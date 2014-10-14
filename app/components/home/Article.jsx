var React = require('react');
var View = require('../ui/views/View');
// var SlideIn = require('../ui/animations/SlideIn');

var Article = React.createClass({
  componentWillEnter(cb) {
    setTimeout(() => cb(), 500);
  },

  componentWillLeave(cb) {
    setTimeout(() => cb(), 500);
  },

  render() {
    return (
      <View className="drawer">
        Article {this.props.toString()}
      </View>
    );
  }

});

module.exports = Article;