var React = require('react');
var Component = require('../component');

/*  @docs

 ## Badge
 Notification icon with text/numbers. Usually used in lists or bars.

 Usage:
 ```
   <Badge>1</Badge>
 ```

 */

module.exports = Component({
  name: 'Badge',

  propTypes: {
    children: React.PropTypes.node
  },

  render() {
    var { children, ...props } = this.props;

    return (
      <div {...this.componentProps()} {...props}>
        <span {...this.componentProps('text')}>
          {children}
        </span>
      </div>
    );
  }
});