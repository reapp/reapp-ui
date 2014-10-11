var React = require('react');

var ImageRollItem = React.createClass({
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
    var url = `/images/home/${src}`;

    divStyle.zIndex = active ? 1 : 0;

    return (
      <div className='image' style={divStyle}>
        <img src={url} style={this.style.img} />
      </div>
    );
  }

});

module.exports = ImageRollItem;