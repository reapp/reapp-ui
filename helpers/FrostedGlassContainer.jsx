var React = require('react/addons');
var FrostedGlassView = require('../views/FrostedGlassView');
var StyleKeys = require('../lib/StyleKeys');
var Component = require('component');

var GlassContainer = React.createClass({
  displayName: 'GlassContainer',

  getDefaultProps: function() {
    return {style: {}, overlays: {}};
  },

  render: function() {
    var mainViewProps = {
      key:"content",
      glassContent:this.props.children,
      left:this.props.content.left,
      top:this.props.content.top,
      width:this.props.content.width,
      height:this.props.content.height,
      style:this.props.content.style
    };

    var viewports = [
      <FrostedGlassView {...mainViewProps} />
    ];

    for (var key in this.props.overlays) {
      var overlay = this.props.overlays[key];

      // TODO: this is somewhat of an anti-pattern: CloneChildren() should create the
      // children with the correct props. But I'm too lazy to build the correct deep
      // merger. And this isn't that bad since this component owns the props anyway.
      var clonedChildren = Component.clone(this.props.children);

      clonedChildren.props = shallowCopy(clonedChildren.props);
      clonedChildren.props.style = shallowCopy(clonedChildren.props.style || {});
      clonedChildren.props.style[StyleKeys.FILTER] = 'blur(5px)';

      var frostedViewProps = {
        key:key,
        glassContent:clonedChildren,
        left:overlay.left,
        top:overlay.top,
        width:overlay.width,
        height:overlay.height,
        style:overlay.style
      };

      viewports.push(
        <FrostedGlassView {...frostedViewProps}>
          {overlay.children}
        </FrostedGlassView>
      );
    }

    var newProps = shallowCopy(this.props);
    newProps.style = newProps.style || {};
    newProps.style.position = newProps.style.position || 'relative';
    newProps.style.overflow = 'hidden';

    return (
      <div {...newProps}>
        {viewports}
      </div>
    );
  }
});


function shallowCopy(x) {
  var y = {};
  for (var z in x) {
    if (!x.hasOwnProperty(z)) {
      continue;
    }
    y[z] = x[z];
  }
  return y;
}

module.exports = GlassContainer;