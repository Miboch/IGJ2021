import {Injectable} from '@angular/core';
import {EntityManagerSystem} from './entity-manager.system';
import {TimerSystem} from './timer.system';
import {Subscription} from 'rxjs';
import {ComponentTypes} from '../components/component-types';
import {ComponentManagerSystem} from './component-manager.system';
import {Transform} from '../components/transform';
import {Sprite} from '../components/sprite';
import {Hoverable} from '../components/hoverable';
import {RendererSystem} from './renderer.system';

@Injectable({providedIn: 'root'})
export class CursorSystem {
  private _attachedElement!: HTMLElement;
  private _cursorPosition: { x: number, y: number } = {x: 9000, y: 9000};
  private internalSubscription: Subscription;
  private updatesPerSecond = 60;

  constructor(private entities: EntityManagerSystem,
              private timer: TimerSystem,
              private components: ComponentManagerSystem,
              private render: RendererSystem) {
    this.internalSubscription = timer.getWithUPS(this.updatesPerSecond).subscribe(r => {
      this.markAndUnmarkHovering();
    });
  }

  set attachedElement(element: HTMLElement) {
    if (this._attachedElement) {
      this._attachedElement.onmousemove = null;
    }
    this._attachedElement = element;
    this._attachedElement.onmousemove = (event) => {
      let target = (<HTMLElement>event.target).getBoundingClientRect() as DOMRect;
      this.cursorMove(event.clientX - target.x, event.clientY - target.y)
    }
  }

  cursorMove(x: number, y: number) {
    this._cursorPosition = {x, y}
  }

  markAndUnmarkHovering() {
    // only allow hover on entities with both sprite and hoverable.
    let entities = this.entities.activeEntities.filter(e => ComponentTypes.HOVERABLE & e.components && ComponentTypes.SPRITE & e.components);
    entities.forEach(e => {
      let components = this.components.getComponentsForOwner(e.id);
      const transform = components[ComponentTypes.TRANSFORM] as Transform;
      const sprite = components[ComponentTypes.SPRITE] as Sprite;
      const hover = components[ComponentTypes.HOVERABLE] as Hoverable;
      if (sprite.ready) {
        const scaleFactor = transform.scale * this.render.scaling;
        let halfWidth = (sprite.image.width / 2) * scaleFactor;
        let halfHeight = (sprite.image.height / 2) * scaleFactor;
        const x0 = (transform.x * this.render.scaling - halfWidth) * Math.cos(transform.rot) + (transform.y * this.render.scaling - halfHeight) * Math.sin(transform.rot);
        const x1 = (transform.x * this.render.scaling + halfWidth) * Math.cos(transform.rot) + (transform.y * this.render.scaling + halfHeight) * Math.sin(transform.rot);
        const y0 = -(transform.x * this.render.scaling - halfWidth) * Math.sin(transform.rot) + (transform.y * this.render.scaling - halfHeight) * Math.cos(transform.rot);
        const y1 = -(transform.x * this.render.scaling + halfWidth) * Math.sin(transform.rot) + (transform.y * this.render.scaling + halfHeight) * Math.cos(transform.rot);

        this.render.renderTestRect(x0, y0, x1 - x0, y1 - y0);


        hover.isHovering = this._cursorPosition.x >= (x0)
          && this._cursorPosition.x <= (x1)
          && this._cursorPosition.y >= y0
          && this._cursorPosition.y <= y1;


        // const scaledWHalf = (sprite.image.width * transform.scale * this.render.scaling) / 2;
        // const scaledHHalf = (sprite.image.height * transform.scale * this.render.scaling) / 2;
        // hover.isHovering = this._cursorPosition.x >= (transform.x - scaledWHalf)
        //   && this._cursorPosition.x <= (transform.x + scaledWHalf)
        //   && this._cursorPosition.y >= (transform.y - scaledHHalf)
        //   && this._cursorPosition.y <= (transform.y + scaledHHalf);
      }

    })
  }


}
