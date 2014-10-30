var { Component } = require('carpo');
var React = require('react/addons');
var cx = React.addons.classSet;

require('./Comment.styl');

module.exports = Component('Comment',
  function render(cursor) {
    var comment = cursor.data;
    var toggleOpened = (e) => {
      e.stopPropagation();
      comment.update('closed', closed => !closed);
    };

    var classes = { comment: true, closed: comment.get('closed') };
    classes[`level-${cursor.level}`] = true;

    return (
      <div className={cx(classes)} onClick={toggleOpened}>
        <div className="comment--content">
          <h3>{comment.get('by')} - {comment.get('closed').toString()}</h3>
          <p dangerouslySetInnerHTML={{__html: comment.get('text')}}></p>
        </div>
        {this.props.statics}
      </div>
    );
  }
);