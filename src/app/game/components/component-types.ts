import {Sprite} from './sprite';
import {Transform} from './transform';
import {PowerGenerator} from './power-generator';
import {Cursor} from './cursor';

export enum ComponentTypes {
  TRANSFORM = 0b0000000001,
  SPRITE = 0b0000000010,
  ORBIT = 0b0000000100,
  POWER_GENERATOR = 0b0000001000,
  CURSOR = 0b0000010000
}

export type Components = Sprite | Transform | PowerGenerator | Cursor
