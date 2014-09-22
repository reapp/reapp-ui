var React = require('react');

module.exports = React.createClass({

  style: {
    div: {
      position: 'absolute',
      zIndex: 0
    },

    img: {
      width: '100%'
    }
  },

  render: function() {
    var divStyle = this.style.div;
    divStyle.zIndex = this.props.active ? 1 : 0;

    return (
      <div className="image" style={divStyle}>
        <img src={this.props.src} style={this.style.img} />
      </div>
    );
  }

});