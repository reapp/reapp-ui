var React = require('react/addons');

require('./Icon.css');
var cx = React.addons.classSet;

require('./Icon.styl');

var Icon = React.createClass({
  getDefaultProps() {
    return {
      size: 32,
      color: '#777'
    };
  },

  styles: (size, color) => ({
    width: size,
    height: size,
    overflow: 'hidden',
    color: color
  }),

  render() {
    var { size, color } = this.props;
    var classes = { icon: true };
    var scale = size / 64;

    return this.transferPropsTo(
      <span className={cx(classes)} style={this.styles(size, color)}>
        <svg
          viewBox="0 0 64 64"
          style={{width:size, height:size, shapeRendering: 'crispEdges'}}>
          <g
            dangerouslySetInnerHTML={{__html:
              '<use xlink:href="/icons/svg/'+ this.props.type +'.svg#Layer_1"></use>'
            }} />
        </svg>
      </span>
    );
  }

});

module.exports = Icon;