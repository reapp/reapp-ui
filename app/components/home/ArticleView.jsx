var React = require('react');
var View = require('../ui/views/View');

var ArticleView = React.createClass({
  render() {
    return (
      <View className="drawer">
        Article {this.props.toString()}
      </View>
    );
  }

});

module.exports = ArticleView;