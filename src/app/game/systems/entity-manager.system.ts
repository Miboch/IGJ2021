import {Injectable} from '@angular/core';
import {Entity} from '../entities/entity';
import {Components} from '../components/component-types';
import {ComponentManagerSystem} from './component-manager.system';

@Injectable({providedIn: 'root'})
export class EntityManagerSystem {
  private entities: Entity[];

  constructor(private componentManager: ComponentManagerSystem) {
    this.entities = [];
  }

  get activeEntities() {
    return this.entities;
  }

  createEntitiy() {
    const e = new Entity();
    this.entities.push(e);
    let entityWrapper = {
      addComponents: (...components: Components[]) => {
        components.forEach(component => {
          component.ownerId = e.id;
          e.addComponent(component.type);
          this.componentManager.addComponent(e.id, component);
        })
        return entityWrapper;
      },
      id: e.id,
      entity: e
    };
    return entityWrapper;
  }
}
