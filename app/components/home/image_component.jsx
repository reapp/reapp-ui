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
    var { active, src } = this.props;
    var divStyle = this.style.div;
    var base = 'http://localhost:8000/app/assets/images/home/';

    divStyle.zIndex = active ? 1 : 0;

    return (
      <div className='image' style={divStyle}>
        <img src={base + src} style={this.style.img} />
      </div>
    );
  }

});