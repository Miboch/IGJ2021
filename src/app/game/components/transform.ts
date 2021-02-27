import {BaseComponent} from './base-component';
import {ComponentTypes} from './component-types';

export class Transform extends BaseComponent {
  x: number;
  y: number;
  scale: number;
  rot: number = 0;

  constructor(x: number = 0, y: number = 0, scale: number = 1, rot = 0) {
    super(ComponentTypes.TRANSFORM);
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.deg = rot;
  }

  get rad() {
    return this.rot * Math.PI / 180;
  }

  set rad(newRad: number) {
    this.rot += newRad * 180 / Math.PI
  }

  get deg() {
    return this.rot;
  }

  set deg(newDegree: number) {
    this.rot = newDegree % 360;
    if (this.rot < 0) {
      this.rot += 360;
      this.deg = this.rot;
    }
  }

}
