import {Injectable} from '@angular/core';
import {Components} from '../components/component-types';

@Injectable({providedIn: 'root'})
export class ComponentManagerSystem {
  componentMap: { [ownerId: number]: { [componentId: number]: any } } = {}

  constructor() {
  }

  addComponent(ownerId: number, component: Components) {
    if (!Boolean(this.componentMap[ownerId]))
      this.componentMap[ownerId] = {}
    this.componentMap[ownerId][component.type] = component;
  }

  getComponentsForOwner(ownerId: number) {
    return this.componentMap[ownerId];
  }


}
