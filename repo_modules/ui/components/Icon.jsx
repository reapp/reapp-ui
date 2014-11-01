var React = require('react/addons');

require('./Icon.css');
var cx = React.addons.classSet;

var Icon = React.createClass({
  render() {
    var style = {
      color: this.props.color || null
    };

    var classes = {};
    // classes['icon-' + this.props.size] = !!this.props.size;
    // classes['ios-icon-' + this.props.type] = true;

    return this.transferPropsTo(
      <span className={cx(classes)} style={style}>
        <svg
          style={{width:40, height:40, color:'#000', background:'#ccc'}}
          dangerouslySetInnerHTML={{__html:
           '<use xlink:href="/icons/svg/'+ this.props.type +'.svg#Layer_1"></use>'
         }}>
        </svg>
      </span>
    );
  }

});

module.exports = Icon;