var React = require('react/addons');
var ReactStyle = require('react-style');
var DocumentTitle = require('react-document-title');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var ReactDescriptor = require('react/lib/ReactDescriptor');
var ToolbarStyle = require('../style/Toolbar');

// todo: auto center buttons in titlebars, calc size

require('./TitleBar.styl');

var TitleBar = React.createClass({
  getDefaultProps() {
    return { style: ToolbarStyle(this.props) };
  },

  styles: (props) => ReactStyle(props),

  componentDidMount() {
    if (this.refs.mid) {
      var mid = this.refs.mid.getDOMNode();
      var winCenter = this.refs.titlebar.getDOMNode().clientWidth / 2;
      var midCenter = mid.offsetLeft + (mid.clientWidth / 2);
      mid.style.left = (winCenter-midCenter) + 'px';
    }
  },

  addIconTransform(component) {
    return ReactDescriptor.isValidDescriptor(component) ?
      React.addons.cloneWithProps(component, {
        iconProps: Object.assign({}, { transforms: 'MOVE_TO_RIGHT' }, component.props.iconProps)
      }) :
      component;
  },

  render() {
    if (!this.props.children)
      return null;

    var left = this.props.left;
    var mid = this.props.children;
    var right = this.props.right;
    var styles = this.styles(this.props.style);

    // add icon transitions for left and right
    left = this.addIconTransform(left);
    right = this.addIconTransform(right);

    return (
      <div ref="titlebar" className="TitleBar" data-transform="FADE_LEFT" data-transform-index={this.props.index} styles={styles}>
        <div className="TitleBar--left">{left}</div>
        <div ref="mid" className="TitleBar--mid">{mid}</div>
        <div className="TitleBar--right">{right}</div>
      </div>
    );
  }
});

module.exports = TitleBar;