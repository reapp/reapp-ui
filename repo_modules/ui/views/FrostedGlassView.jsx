var React = require('react');
var TouchableArea = require('ui/helpers/TouchableArea');

var FrostedGlassView = React.createClass({
  displayName: 'FrostedGlassView',

  getDefaultProps: function() {
    return {glassStyle: {}};
  },

  render: function() {
    var {
      left,
      top,
      width,
      height,
      glassStyle,
      glassContent,
      children,
      ...props } = this.props;

    var style = {
      position: 'absolute',
      left: left,
      top: top,
      width: width,
      height: height,
      overflow: 'hidden'
    };

    var glassStyle = glassStyle || {};
    glassStyle.position = 'absolute';
    // TODO: this won't animate well. Not sure if compositing will
    // make things better or worse...
    glassStyle.left = -left;
    glassStyle.top = -top;

    var contentStyle = {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0
    };

    return (
      <TouchableArea {...props} style={style}>
        <div style={glassStyle}>
          {glassContent}
        </div>
        <div style={contentStyle}>
          {children}
        </div>
      </TouchableArea>
    );
  }
});

module.exports = FrostedGlassView;