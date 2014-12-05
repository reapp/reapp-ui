var React = require('react');
var Time = require('react-ago-component');
var Icon = require('ui/components/Icon');
var ListItem = require('ui/components/ListItem');
var { Link } = require('react-router');
var Badge = require('ui/components/Badge');

require('./ArticleItem.styl');

module.exports = React.createClass({
  render() {
    var { cursor, index } = this.props;
    if (!cursor)
      return null;

    var article = cursor.get('data');

    //<Link to="user" params={{id: article.get('by')}} activeClassName="">
    var stats = (
      <ul>
        <li className="score">
          <Badge>{article.get('score')}</Badge>
        </li>
        <li>
            {article.get('by')}
        </li>
        <li className="time">
          <Time date={new Date(article.get('time') * 1000)} autoUpdate />
        </li>
      </ul>
    );

    var articleRight = (
      <Link to="article" params={{id: article.get('id')}} activeClassName="">
        <Icon type="speech" color="#999" />
      </Link>
    );

    return (
      <ListItem
        key={index}
        className="Article"
        styles={{ after: { margin: 0 } }}
        onClick={this.onTouch}
        wrapper={<a className="article--link" href={article.get('url')} />}
        title={article.get('title')}
        after={articleRight}
        index={index}
        noicon>
        {stats}
      </ListItem>
    );
  }
});