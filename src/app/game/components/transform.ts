import {BaseComponent} from './base-component';
import {ComponentTypes} from './component-types';

export class Transform extends BaseComponent {
  x: number;
  y: number;
  scale: number;
  rot: number;

  constructor(x: number = 0, y: number = 0, scale: number = 1, rot = 0) {
    super(ComponentTypes.TRANSFORM);
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.rot = rot;
  }
}
