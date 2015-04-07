/* Decorator to add react-tween-state to class */
import { Mixin } from 'reapp-tween-state';

export default SubComponent => {
  Object.assign(SubComponent.prototype, Mixin);
  return SubComponent;
};