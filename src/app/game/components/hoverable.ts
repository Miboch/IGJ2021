import {BaseComponent} from './base-component';
import {ComponentTypes} from './component-types';

export class Hoverable extends BaseComponent {
  private _isHovering = false;

  constructor() {
    super(ComponentTypes.HOVERABLE);
  }

  set isHovering(hoverState: boolean) {
    this._isHovering = hoverState;
  }
  get isHovering() {
    return this._isHovering;
  }
}
