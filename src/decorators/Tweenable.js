/* Decorator to add react-tween-state to class */
import { Mixins } from 'react-class-helper';
import { Mixin } from 'react-tween-state';

export default SubComponent => Mixins(SubComponent, [Mixin]);