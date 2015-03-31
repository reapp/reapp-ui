var React = require('react');
var Component = require('../component');

module.exports = Component({
  name: 'GalleryImage',

  render() {
    var { url, height, ...props } = this.props;

    this.addStyles({
      backgroundImage: `url(${url})`,
      height,
    });

    return (
      <div {...this.componentProps()} {...props}>
        <div {...this.componentProps('img')}></div>
      </div>
    );
  }
});