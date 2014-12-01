var ViewComponent = require('ui/viewcomponent');

module.exports = ViewComponent('ViewMain', {
  getInitialState() {
    return { inactive: false };
  },

  componentDidMount() {
    // todo: better way to determine null component?
    var children = this.refs.ViewMain.getDOMNode().children;
    if (children.length === 1 && children[0].tagName === 'NOSCRIPT')
      this.setState({ inactive: true });
  },

  render() {
    var { children, hasChild, ...props } = this.props;

    if (!children)
      this.addStyles(this.styles.childless);

    this.addStyles({
      zIndex: this.getZIndexForLayer() + 50
    });

    if (this.state.inactive || this.props.inactive)
      this.addStyles({ pointerEvents: 'none' });

    return (
      <div {...props} {...this.componentProps()}>
        {children}
      </div>
    );
  }
});