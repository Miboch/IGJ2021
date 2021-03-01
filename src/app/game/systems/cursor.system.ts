import {Injectable} from '@angular/core';
import {EntityManagerSystem} from './entity-manager.system';
import {TimerSystem} from './timer.system';
import {Subject, Subscription} from 'rxjs';
import {ComponentTypes} from '../components/component-types';
import {ComponentManagerSystem} from './component-manager.system';
import {Transform} from '../components/transform';
import {Sprite} from '../components/sprite';
import {RendererSystem} from './renderer.system';
import {Cursor} from '../components/cursor';
import {Entity} from '../entities/entity';

@Injectable({providedIn: 'root'})
export class CursorSystem {
  private _attachedElement!: HTMLElement;
  private _cursorPosition: { x: number, y: number } = {x: 9000, y: 9000};
  private internalSubscription: Subscription;
  private updatesPerSecond = 60;
  private clickedEntities: Subject<Entity[]> = new Subject<Entity[]>();


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
      this._attachedElement.onclick = null;
    }
    this._attachedElement = element;
    this._attachedElement.onmousemove = (event) => {
      let target = (<HTMLElement>event.target).getBoundingClientRect() as DOMRect;
      this.cursorMove(event.clientX - target.x, event.clientY - target.y)
    }
    this._attachedElement.onclick = (click) => {
      click.preventDefault();
      const clicked = this.entities.activeEntities.filter(e =>
        ComponentTypes.CURSOR & e.components
        && this.components.getComponentsForOwner(e.id)[ComponentTypes.CURSOR].isHovering)
      this.clickedEntities.next(clicked);
    }
  }

  listenForClickedEntities() {
    return this.clickedEntities.asObservable();
  }

  cursorMove(x: number, y: number) {
    this._cursorPosition.x = x;
    this._cursorPosition.y = y;
  }

  private markAndUnmarkHovering() {
    // only allow hover on entities with both sprite and hoverable.
    let entities = this.entities.activeEntities.filter(e => ComponentTypes.CURSOR & e.components && ComponentTypes.SPRITE & e.components);
    entities.forEach(e => {
      const components = this.components.getComponentsForOwner(e.id);
      const sprite = components[ComponentTypes.SPRITE] as Sprite;
      if (sprite.ready) {
        const hover = components[ComponentTypes.CURSOR] as Cursor;
        const transform = components[ComponentTypes.TRANSFORM] as Transform;
        const scale = transform.scale * this.render.scaling;
        const width = sprite.image.width * scale;
        const height = sprite.image.height * scale;
        const [topLeft, topRight, bottomLeft, bottomRight, cursor] = this.extractPoints(transform, width, height);
        const tri1 = this.calcAreaOfTriangle(
          this.calcDistance(cursor, topLeft),
          this.calcDistance(topLeft, topRight),
          this.calcDistance(topRight, cursor)
        );
        const tri2 = this.calcAreaOfTriangle(
          this.calcDistance(cursor, topRight),
          this.calcDistance(topRight, bottomRight),
          this.calcDistance(bottomRight, cursor)
        );
        const tri3 = this.calcAreaOfTriangle(
          this.calcDistance(cursor, bottomRight),
          this.calcDistance(bottomRight, bottomLeft),
          this.calcDistance(bottomLeft, cursor)
        );
        const tri4 = this.calcAreaOfTriangle(
          this.calcDistance(cursor, bottomLeft),
          this.calcDistance(bottomLeft, topLeft),
          this.calcDistance(topLeft, cursor)
        );
        hover.isHovering = Math.floor(tri1 + tri2 + tri3 + tri4) <= width * height;
      }
    })
  }

  private extractPoints(transform: Transform, width: number, height: number) {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const origin = {x: transform.x * this.render.scaling, y: transform.y * this.render.scaling};
    const topLeft = this.rotatePoint({x: origin.x - halfWidth, y: origin.y - halfHeight}, origin, transform.rad);
    const topRight = this.rotatePoint({x: origin.x + halfWidth, y: origin.y - halfHeight}, origin, transform.rad);
    const bottomLeft = this.rotatePoint({x: origin.x - halfWidth, y: origin.y + halfHeight}, origin, transform.rad);
    const bottomRight = this.rotatePoint({x: origin.x + halfWidth, y: origin.y + halfHeight}, origin, transform.rad);
    return [topLeft, topRight, bottomLeft, bottomRight, this._cursorPosition];
  }

  private rotatePoint(point: { x: number, y: number }, origin: { x: number, y: number }, radians: number) {
    const newPoint = {x: 0, y: 0};
    newPoint.x = Math.cos(radians) * (point.x - origin.x) - Math.sin(radians) * (point.y - origin.y) + origin.x;
    newPoint.y = Math.sin(radians) * (point.x - origin.x) + Math.cos(radians) * (point.y - origin.y) + origin.y;
    return newPoint;
  }

  calcDistance(p1: { x: number, y: number } | any, p2: { x: number, y: number } | any) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  calcAreaOfTriangle(dist1: number, dist2: number, dist3: number) {
    let s = (dist1 + dist2 + dist3) / 2;
    return Math.sqrt(s * (s - dist1) * (s - dist2) * (s - dist3));
  }


}
