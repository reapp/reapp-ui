var React = require('react');
var Time = require('react-time');
var Icon = require('ui/components/Icon');
var ListItem = require('ui/components/ListItem');
var { Link } = require('react-router');
var Badge = require('ui/components/Badge');

require('./ArticleItem.styl');

module.exports = React.createClass({
  render() {
    var { cursor, index, noLink } = this.props;
    if (!cursor)
      return null;

    var article = cursor.get('data');

    var stats = (
      <ul>
        <li className="score">
          <Badge>{article.get('score')}</Badge>
        </li>
        <li className="author">
          <Link to="user" params={{id: article.get('by')}} activeClassName="">
            {article.get('by')}
          </Link>
        </li>
        <li className="time">
          <Time value={new Date(article.get('time') * 1000)} relative />
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
        className="ArticleItem"
        styles={{ after: { margin: 0 } }}
        onClick={this.onTouch}
        wrapper={!noLink && <a className="article--link" href={article.get('url')} />}
        title={article.get('title')}
        after={articleRight}
        index={index}
        noicon>
        {stats}
      </ListItem>
    );
  }
});