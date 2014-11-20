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
    var cursor = props.cursor.get('data');
    var classes = { Article: true };

    //<Link to="user" params={{id: cursor.get('by')}} activeClassName="">
    var stats = (
      <ul>
        <li className="score">
          <span>{cursor.get('score')}</span>
        </li>
        <li>
            {cursor.get('by')}
        </li>
        <li className="time">
          <Time date={new Date(cursor.get('time') * 1000)} autoUpdate />
        </li>
      </ul>
    );

    var articleRight = (
      <Link to="article" params={{id: cursor.get('id')}} activeClassName="">
        <Icon type="speech" color="#999" />
      </Link>
    );

    return (
      <ListItem
        className={React.addons.classSet(classes)}
        onClick={this.onTouch}
        wrapper={<a className="article--link" href={cursor.get('url')} />}
        title={cursor.get('title')}
        after={articleRight}
        noicon>
        {stats}
      </ListItem>
    );
  }
);