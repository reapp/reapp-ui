var Component = require('omniscient');
var React = require('react/addons');
var Time = require('react-ago-component');
var Icon = require('ui/components/Icon');
var ListItem = require('ui/components/ListItem');
var { Link } = require('react-router');

require('./ArticleItem.styl');

var mixins = [{
  onTouch() {
  }
}];

module.exports = Component('ArticleItem', mixins,
  function render(props) {
    var { cursor } = props;
    if (!cursor) return null;

    var article = cursor.get('data');
    var classes = { Article: true };

    //<Link to="user" params={{id: article.get('by')}} activeClassName="">
    var stats = (
      <ul>
        <li className="score">
          <span>{article.get('score')}</span>
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
        className={React.addons.classSet(classes)}
        onClick={this.onTouch}
        wrapper={<a className="article--link" href={article.get('url')} />}
        title={article.get('title')}
        after={articleRight}
        noicon>
        {stats}
      </ListItem>
    );
  }
);