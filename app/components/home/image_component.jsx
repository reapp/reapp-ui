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
        <img src={'http://localhost:8080/images/home/' + this.props.src} style={this.style.img} />
      </div>
    );
  }

});