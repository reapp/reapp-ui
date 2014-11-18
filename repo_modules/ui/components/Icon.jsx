var React = require('react/addons');
var cx = React.addons.classSet;

var Icon = React.createClass({
  getDefaultProps() {
    return {
      size: 32,
      style: { color: '#777' }
    };
  },

  render() {
    var { size, style, type, stroke, ...props } = this.props;
    var classes = { Icon: true };
    var scale = size / 64;

    var strokeProps;
    if (stroke) {
      strokeProps = {
        stroke: style.color,
        strokeWidth: stroke * 4, // were scaling down from 64 / 2
        strokeLinecap: 'round'
      };
    }

    var styles = Object.assign({
      width: size,
      height: size,
      overflow: 'hidden'
    }, style);

    return (
      <span {...props}
        style={styles}
        className={cx(classes)}>
        <svg
          {...strokeProps}
          fill={style.color}
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