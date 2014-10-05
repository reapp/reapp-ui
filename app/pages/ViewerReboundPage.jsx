var React = require('react');
var Images = require('../assets/data/images');
var ViewerRebound = require('../components/viewer_rebound/ViewerRebound');

var NUM_IMAGES = 10;
var START_INDEX = 5;

var ViewerPage = React.createClass({
  getInitialState() {
    return {
      width: 0,
      height: 0
    };
  },

  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  },

  render() {
    if (!this.state.width || !this.state.height) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ViewerRebound
          width={this.state.width}
          height={this.state.height}
          images={Images} />
      </div>
    );
  }
});

module.exports = ViewerPage;