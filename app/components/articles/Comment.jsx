var Component = require('omniscient');
var React = require('react/addons');
var cx = React.addons.classSet;

require('./Comment.styl');

module.exports = Component('Comment',
  function render(props) {
    var { data, level, children } = props;

    var toggleOpened = (e) => {
      e.stopPropagation();
      data.update('closed', closed => !closed);
    };

    var classes = { comment: true, closed: data.get('closed') };
    classes[`level-${level}`] = true;

    return (
      <div className={cx(classes)} onClick={toggleOpened}>
        <div className="comment--content">
          <h3>{data.get('by')} - {data.get('closed').toString()}</h3>
          <p dangerouslySetInnerHTML={{__html: data.get('text')}}></p>
        </div>
        {children}
      </div>
    );
  }
);