/* Decorator to add react-tween-state to class */
import Animate from 'react-animate-state';

export default SubComponent => {
  Object.assign(SubComponent.prototype, Animate);
  return SubComponent;
};