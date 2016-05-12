var React = require('react');
var Component = require('../component');
var List = require('./List');

module.exports = Component({
  name: 'TypeaheadList',

  render() {
    var {...props } = this.props;

    return <List {...this.componentProps()} {...props} wrap />;
  }
});