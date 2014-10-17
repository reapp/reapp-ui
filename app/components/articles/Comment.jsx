var React = require('react');

require('./Comment.styl');

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <div className="comment--content">
          <h3>{this.props.data.by}</h3>
          <p>{this.props.data.text}</p>
        </div>

        {this.props.children}
      </div>
    );
  }
});

module.exports = Comment;