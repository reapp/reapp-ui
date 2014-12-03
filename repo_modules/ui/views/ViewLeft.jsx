var ViewComponent = require('ui/viewcomponent');
var View = require('./View');
var TitleBar = require('../components/TitleBar');
var ViewsStore = require('ui/stores/ViewsStore');

module.exports = ViewComponent('ViewLeft', {
  componentWillMount() {
    this.id = 'ViewLeft-' + ViewsStore.lastViewLeftID++;
  },

  render() {
    var { children, title, ...props } = this.props;

    return title ? (
      <div id={this.id} {...this.componentProps()}>
        <TitleBar>{title}</TitleBar>
        <View {...props}>
          {children}
        </View>
      </div>
    ) : (
      <View {...props} {...this.componentProps()} top={0}>
        {children}
      </View>
    );
  }
});