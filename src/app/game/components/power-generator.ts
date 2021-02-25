import {BaseComponent} from './base-component';
import {ComponentTypes} from './component-types';

export class PowerGenerator extends BaseComponent {
  generationValue: number = 0;

  constructor(generateValue = 0) {
    super(ComponentTypes.POWER_GENERATOR);
  }
}
