var React = require('react');
var Component = require('../component');
var clone = require('../lib/niceClone');
var ChatItem = require('./ChatItem');

module.exports = Component({
  name: 'Chat',

  propTypes: {
    itemProps: React.PropTypes.object,
    wrap: React.PropTypes.bool
  },

  render() {
    var {
      children,
      itemProps,
      wrap,
      ...props } = this.props;

    return (
      <ul {...this.componentProps()} {...props}>
        {React.Children.map(children, (li, i) => {
          if (wrap)
            return (
              <ChatItem {...itemProps}
                index={i}
                key={i}>
                {li.content || li}
              </ChatItem>
            );

          return clone(li, { key: i, index: i });
        })}
      </ul>
    );
  }
});