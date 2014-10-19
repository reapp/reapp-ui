var React = require('react/addons');
var Time = require('react-ago-component');
var { Link } = require('react-router');
var { FluxMixin } = require('../../flux/bootstrap');
var Cx = React.addons.classSet;

require('./ArticleItem');

var ArticleItem = React.createClass({
  mixins: [FluxMixin],

  onTouch() {
    console.log(this.getFlux());
  },

  render() {
    var article = this.props.article;
    var classes = {
      "article": true
    };

    return (
      <div className={Cx(classes)} style={this.props.style} onClick={this.onTouch}>
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