var React = require('react/addons');
var Styled = require('ui/styled');
var cx = React.addons.classSet;

var Icon = React.createClass({
  mixins: [Styled('icon')],

  getDefaultProps() {
    return {
      size: 32,
      color: '#777',
      style: {}
    };
  },

  render() {
    var { size, style, type, color, stroke, ...props } = this.props;
    var classes = { Icon: true };
    var scale = size / 64;

    var strokeProps;
    if (stroke) {
      strokeProps = {
        stroke: color,
        strokeWidth: stroke * 4, // were scaling down from 64 / 2
        strokeLinecap: 'round'
      };
    }

    var styles = Object.assign({
      color: color,
      width: size,
      height: size,
      overflow: 'hidden'
    }, style);

    return (
      <span {...props}
        styles={this.getStyles()}
        style={styles}
        className={cx(classes)}>
        <svg
          {...strokeProps}
          fill={color}
          viewBox="0 0 64 64"
          style={{width:size, height:size, shapeRendering: 'crispEdges', fill: 'currentColor'}}>
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