var React = require('react/addons');
var Component = require('ui/component');
var DocumentTitle = require('react-document-title');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var AcceptsContexts = require('../mixins/AcceptsContexts');

require('./TitleBar.styl');

module.exports = Component({
  name: 'TitleBar',

  mixins: [
    AcceptsContexts({viewList: 'object'})
  ],

  getDefaultProps() {
    return {
      width: window.innerWidth,
      animations: [
        { name: 'fadeLeft', source: 'viewList' }
      ]
    };
  },

  componentWillMount() {
    this.splitTitles(this.props);
    this.addIconAnimations(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.splitTitles(nextProps);
    this.addIconAnimations(nextProps);
  },

  componentDidMount() {
    this.centerMiddleTitle();
  },

  componentDidUpdate(prevProps) {
    if (prevProps.title !== this.props.title)
      this.centerMiddleTitle();
  },

  // allow 3-length array to set title
  splitTitles(props) {
    var { left, right, children } = props;

    if (!left && !right && Array.isArray(children)) {
      props.left = children[0];
      props.right = children[2];
      props.children = children[1];
    }
  },

  centerMiddleTitle() {
    if (this.refs.mid) {
      var mid = this.refs.mid.getDOMNode();
      var winCenter = this.refs.TitleBar.getDOMNode().clientWidth / 2;
      var midCenter = mid.offsetLeft + (mid.clientWidth / 2);
      mid.style.left = (winCenter-midCenter) + 'px';
    }
  },

  addIconAnimations(props) {
    props.left = this.addIconAnimation(props.left);
    props.right = this.addIconAnimation(props.right);
  },

  addIconAnimation(component) {
    var isValid = React.isValidElement(component);

    // add moveToRight icon animation
    if (!isValid)
      return component;

    var iconProps = component.props.iconProps;
    iconProps = iconProps || {};

    if (!iconProps.animations || !iconProps.animations.filter(a => a && a.source === 'viewList'))
      iconProps.animations = [].concat(iconProps.animations,
        { name: 'moveToRight', source: 'viewList' });

    iconProps.viewList = this.context.viewList;
    return React.addons.cloneWithProps(component, component.props);
  },

  render() {
    var { animations, left, right, children, height, transparent, ...props } = this.props;

    if (transparent)
      this.addStyles(this.styles.transparent);

    if (height)
      this.addStyles({ height });

    if (animations)
      props.style = this.getAnimationStyles();

    return (
      <div {...props} {...this.componentProps()}>
        <div {...this.componentProps('left')}>{left}</div>
        <div {...this.componentProps('mid')}>{children}</div>
        <div {...this.componentProps('right')}>{right}</div>
      </div>
    );
  }
});