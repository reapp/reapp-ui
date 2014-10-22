var Component = require('omniscient');
var React = require('react/addons');
var Time = require('react-ago-component');
var { Link } = require('react-router');

require('./ArticleItem');

var mixins = [{
  onTouch() {
  }
}];

module.exports = Component('ArticleItem', mixins, function(article) {
  var classes = { 'article': true };

  return (
    <div
      className={React.addons.classSet(classes)}
      style={this.props && this.props.style}
      onClick={this.onTouch}>
      <h3>
        <Link to="article" params={{id: article.get('id')}} activeClassName="">
          {article.get('title')}
        </Link>
      </h3>
      <ul>
        <li className="score">
          <span>{article.get('score')}</span>
        </li>
        <li>
          <Link to="user" params={{id: article.get('by')}} activeClassName="">
            {article.get('by')}
          </Link>
        </li>
        <li className="time">
          <Time date={new Date(article.get('time') * 1000)} autoUpdate />
        </li>
      </ul>
    </div>
  );

});