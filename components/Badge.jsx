var React = require('react');
var Component = require('../component');

/*
 *  ### Badge
 *  Small element usually used in lists to call out it's content.
 *  Also useful for adding numbers for noticiations.
 *
 *  Usage:
 *  ```
 *    <Badge>1</Badge>
 *  ```
 */

module.exports = Component({
  name: 'Badge',

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