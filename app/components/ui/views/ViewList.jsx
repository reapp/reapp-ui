var React = require('react');
var TitleBar = require('../components/TitleBar');

var ViewList = React.createClass({
  propTypes: {
    title: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ]),

  },

  getDefaultProps() {
    return {
      titleAttr: 'title',
      contentAttr: 'content'
    };
  },

  getClassName(responds) {

  },

  render() {
    var titles = (
      <TitleBar>
        {this.props.titles.map(title => {
          var left, mid, right;

          if (Array.isArray(title)) {
            left = title[0];
            mid = title[1];
            right = title[2];
          }
          else {
            mid = title;
          }

          return ([
            <div class="left">{left}</div>,
            <div class="mid">{mid}</div>,
            <div class="right">{right}</div>
          ]);
        })}
      </TitleBar>
    );

    var views = makeViews(views, 0);

    function makeViews(views, index) {
      var view = views.get(index);
      if (!view) return null;

      var nextView = makeViews(views, ++index);
      var active = !nextView;

      return (
        <DrawerView
          id={'View-' + index}
          parents={['View-' + (index - 1)]}
          title={view.get('title').toArray()}
          active={active}>

          <div className="content">{view.get('content')}</div>
          {nextView};
        </DrawerView>
      );
    }

    return (
      <div className={this.getClassName(responds)}>
        {titles}
        {React.children.map(this.props.children, child => (
          <div>child</div>
        ))}
      </div>
    );
  }
});

module.exports = ViewList;