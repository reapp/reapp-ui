var React = require('react');
var Time = require('react-ago-component');
var { Link } = require('react-router');

var ArticleItem = React.createClass({
  render() {
    var article = this.props.article;

    return (
      <div className="article" style={this.props.style}>
        <h3>
          <Link to="article" params={{id: article.id}}>
            {article.title}
          </Link>
        </h3>
        <ul>
          <li className="score">{article.score}</li>
          <li>{article.by}</li>
          <li className="time"><Time date={new Date(article.time * 1000)} autoUpdate /></li>
        </ul>
      </div>
    );
  }

});

module.exports = ArticleItem;