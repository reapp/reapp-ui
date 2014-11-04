var React = require('react/addons');
var cx = React.addons.classSet;

require('./Icon.styl');

var Icon = React.createClass({
  getDefaultProps() {
    return {
      size: 32,
      style: { color: '#777' }
    };
  },

  styles: (style, size) => (Object.assign({}, {
    width: size,
    height: size,
    overflow: 'hidden'
  }, style)),

  render() {
    var { size, style, type, stroke, ...props } = this.props;
    var classes = { Icon: true };
    var scale = size / 64;

    var strokeProps;
    if (stroke) {
      strokeProps = {
        stroke: style.color,
        strokeWidth: stroke,
        strokeLinecap: 'round'
      };
    }

    return (
      <span {...props} className={cx(classes)} style={this.styles(style, size)}>
        <svg
          {...strokeProps}
          fill={style.color}
          viewBox="0 0 64 64"
          style={{width:size, height:size, shapeRendering: 'crispEdges'}}>
          <g
            dangerouslySetInnerHTML={{__html:
              '<use xlink:href="/icons/svg/'+ type +'.svg#Layer_1"></use>'
            }} />
        </svg>
      </span>
    );
  }

});

module.exports = Icon;