var React = require('react');
var Merge = require('react/lib/merge');
var TitleBar = require('../components/TitleBar');
var ToolbarStyle = require('../style/Toolbar');
var TouchableArea = require('../helpers/TouchableArea');
var Transforms = require('../animations/Transforms');
var View = require('./View');
var { Scroller } = require('scroller');

require('./ViewList.styl');

var ViewList = React.createClass({
  mixins: [Transforms.Mixin],

  getInitialState() {
    return { width: 0 };
  },

  componentWillMount() {
    this.getTitlesAndContents(this.props.views);

    this.scroller = new Scroller(this.handleScroll, {
      paging: true,
      bouncing: false
    });

    var width = this.props.width || window.innerWidth;
    var height = this.props.height || window.innerHeight;

    this.setState({
      width: width,
      height: height
    });

    this.scroller.setDimensions(
      width,
      height,
      width * this.props.views.length,
      height
    );

    this.scroller.setSnapSize(width, height);
  },

  handleScroll(left) {
    var step = this.state.width ? left / this.state.width : 0;
    this._doTransforms(step);
  },

  getTitlesAndContents(views) {
    var index = 0;
    var result = {
      titles: [],
      contents: {}
    };

    views.map(view => {
      var title = view.title;
      var id = view.id || ++index;

      result.titles.push(Array.isArray(title) ? title : [,title,]);
      result.contents[id] = view.content;
    });

    this.views = result;
  },

  makeTitles(titles) {
    return titles.map((title, i) => (
      TitleBar({
        title: title,
        index: i,
        style: ToolbarStyle({
          background: 'transparent',
          pointerEvents: 'all'
        })
      })
    ));
  },

  makeViews(contents) {
    return Object.keys(contents).map((id, i) => (
      View({
        key: i,
        id: id,
        touching: !!this.isBeingTouched,
        'data-transform': 'PARALLAX_FADE',
        'data-transform-index': i,
        'data-width': this.state.width,
      }, contents[id])
    ));
  },

  styles(state) {
    return {
      width: this.state.width,
      height: this.state.height,
      flexFlow: 'row'
    };
  },

  handleTouchStart() {
    this.isBeingTouched = true;
  },

  handleTouchEnd() {
    this.isBeingTouched = false;
  },

  handleClick(e) {
    var hash = e.target.hash;
    if (!hash) return;

    var viewIndex = this.props.views.map(v => v.id).indexOf(hash.slice(1));

    if (viewIndex >= 0) {
      this.scroller.scrollTo(this.state.width * viewIndex, 0, true);
      e.preventDefault();
    }
  },

  render() {
    var Titles = this.makeTitles(this.views.titles);
    var Views = this.makeViews(this.views.contents);

    return TouchableArea({
      className: 'ViewList',
      style: this.styles(this.state),
      scroller: this.scroller,
      touchStartBounds: {
        x: [
          { from: 0, to: 10 },
          { from: this.state.width-10, to: this.state.width }
        ]
      },
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onClick: this.handleClick
    }, (
      <div style={ToolbarStyle()}>
        {Titles}
      </div>
    ), Views);
  }
});

module.exports = ViewList;