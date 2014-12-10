var cx = React.addons.classSet;

require('./Comment.styl');

module.exports = React.createClass({
  toggleOpened(e) {
    e.stopPropagation();
    this.props.cursor.update('closed', closed => !closed);
  },

  render() {
    var { cursor, level, children } = this.props;

    var classes = { comment: true, closed: cursor.get('closed') };
    classes[`level-${level}`] = true;

    return (
      <div className={cx(classes)} onClick={this.toggleOpened}>
        <div className="comment--content">
          <h3>{cursor.get('by')}</h3>
          <p dangerouslySetInnerHTML={{__html: cursor.get('text')}}></p>
        </div>
        {children}
      </div>
    );
  }
});