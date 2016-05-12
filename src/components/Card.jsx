var React = require('react');
var Component = require('../component');

module.exports = Component({
  name: 'Card',

  propTypes: {
    title: React.PropTypes.string,
    children: React.PropTypes.node
  },

  getDefaultProps() {
    return {
      animation: 'card'
    };
  },

  makeSection(title, content, subTitle, subContent) {
    return content && (
      <span {...this.componentProps(title)}>
        <div>{content}</div>
        {(typeof subTitle !== 'undefined') && 
          <div {...this.componentProps(subTitle)}>
            {subContent}
          </div>
        }
      </span>
    );
  },

  render() {
    var {
      children,
      title,
      subTitle,
      ...props } = this.props;

    return (
      <div {...this.componentProps()} {...props}>
        {this.makeSection('title', title, 'subTitle', subTitle)}
        {this.makeSection('content', children)}
      </div>
    );
  }
});