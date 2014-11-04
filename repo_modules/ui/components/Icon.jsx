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
    var { size, style, type, ...props } = this.props;
    var classes = { Icon: true };
    var scale = size / 64;

    // todo:
    // allow passing in props for svg (to be set as css?)
    // something like css:
    //  { 'g:first': { ...svgProps } }
    //
    // ex: allow passing these props:
    // stroke="black" stroke-width="2" stroke-linecap="round" fill="none" stroke-linejoin="round"
    // to first element in the svg file

    return (
      <span {...props} className={cx(classes)} style={this.styles(style, size)}>
        <svg
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