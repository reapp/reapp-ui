var React = require('react');
var Component = require('../component');
var clone = require('../lib/niceClone');
var ChatItem = require('./ChatItem');

var Chat = Component({
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
      <div {...this.componentProps()} {...props}>
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
      </div>
    );
  }
});

Chat.Item = ChatItem;

module.exports = Chat;