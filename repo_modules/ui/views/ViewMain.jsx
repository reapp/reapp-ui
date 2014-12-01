var ViewComponent = require('ui/viewcomponent');

module.exports = ViewComponent('ViewMain', {
  getInitialState() {
    return { inactive: false };
  },

  componentDidMount() {
    this.setInactiveIfNoChildren();
  },

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children)
      this.setInactiveIfNoChildren();
  },

  setInactiveIfNoChildren() {
    // todo: better way to determine null component?
    var children = this.refs.ViewMain.getDOMNode().children;
    if (!children || children.length === 1 && children[0].tagName === 'NOSCRIPT')
      this.setState({ inactive: true });
    else
      this.setState({ inactive: false });
  },

  render() {
    var { children, hasChild, ...props } = this.props;

    if (!children)
      this.addStyles(this.styles.childless);

    this.addStyles({
      zIndex: this.getZIndexForLayer() + 50
    });

    if (this.props.inactive || this.state.inactive)
      this.addStyles({ pointerEvents: 'none' });

    return (
      <div {...props} {...this.componentProps()}>
        {children}
      </div>
    );
  }
});