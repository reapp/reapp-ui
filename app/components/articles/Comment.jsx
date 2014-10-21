var React = require('react/addons');
var cx = React.addons.classSet;

require('./Comment.styl');

var Comment = React.createClass({
  getInitialState() {
    return { open: true };
  },

  toggleOpened(e) {
    e.stopPropagation();
    this.setState({ open: !this.state.open });
  },

  render: function() {
    var classes = {
      comment: true,
      closed: !this.state.open
    };

    return (
      <div className={cx(classes)} onClick={this.toggleOpened}>
        <div className="comment--content">
          <h3>{this.props.data.by}</h3>
          <p dangerouslySetInnerHTML={{__html: this.props.data.text}}></p>
        </div>

        {this.props.children}
      </div>
    );
  }
});

module.exports = Comment;