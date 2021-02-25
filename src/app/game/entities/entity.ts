import {ComponentTypes} from '../components/component-types';

export class Entity {
  static nextId = entityId();
  id = Entity.nextId.next().value;
  components: number = 0b0;

  constructor() {
  }

  addComponent(component: ComponentTypes) {
    this.components += component;
    return this;
  }

  removeComponent(component: ComponentTypes) {
    this.components -= component;
    return this;
  }

}

// use generator to make entity ids auto-increment on creation.
function* entityId(): Generator<number> {
  let id = 0;
  while (true) yield id++;
}
