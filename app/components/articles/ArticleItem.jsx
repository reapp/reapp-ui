var { Component } = require('carpo');
var React = require('react/addons');
var Time = require('react-ago-component');
var Icon = require('ui/components/Icon');
var { Link } = require('react-router');

require('./ArticleItem.styl');

var mixins = [{
  onTouch() {
  }
}];

module.exports = Component('ArticleItem', mixins,
  function render(props) {
    var { cursor } = props;
    var classes = { Article: true };

    //<Link to="user" params={{id: cursor.get('by')}} activeClassName="">
    var articleLeft = (
      <div className="article--left">
        <a className="article--link" href={cursor.get('url')}>
          <h3>{cursor.get('title')}</h3>
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
        </a>
      </div>
    );

    var articleRight = (
      <div className="article--right">
        <Link to="article" params={{id: cursor.get('id')}} activeClassName="">
          <Icon type="speech" color="#999" />
        </Link>
      </div>
    );

    return (
      <div
        className={React.addons.classSet(classes)}
        style={this.props && this.props.style}
        onClick={this.onTouch}>
        {articleLeft}
        {articleRight}
      </div>
    );
  }
);