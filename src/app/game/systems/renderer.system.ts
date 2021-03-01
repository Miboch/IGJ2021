import {Injectable} from '@angular/core';
import {of, Subject, Subscription} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {DimensionModel} from '../angular/models/dimension.model';
import {EntityManagerSystem} from './entity-manager.system';
import {Entity} from '../entities/entity';
import {ComponentTypes} from '../components/component-types';
import {ComponentManagerSystem} from './component-manager.system';
import {Sprite} from '../components/sprite';
import {Transform} from '../components/transform';
import {TimerSystem} from './timer.system';
import {Cursor} from '../components/cursor';

const originalCanvasWidth = 990;

@Injectable({providedIn: 'root'})
export class RendererSystem {
  private canvasElement!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private canvasWidth = 0;
  private canvasHeight = 0;
  public scaling = 1;
  private animationSubscription: Subscription;
  private updatesPerSecond = 60;

  constructor(private entityManager: EntityManagerSystem,
              private componentManager: ComponentManagerSystem,
              private timer: TimerSystem) {
    this.animationSubscription = this.timer.getWithUPS(this.updatesPerSecond).pipe(filter(_ => Boolean(this.canvasElement)))
      .subscribe(deltaTime => {
        this.renderLoop(deltaTime);
      });
  }

  set canvasTarget(canvas: HTMLCanvasElement) {
    this.canvasElement = canvas;
    this.context = this.canvasElement.getContext('2d') as CanvasRenderingContext2D;
    this.canvasWidth = this.canvasElement.width;
    this.canvasHeight = this.canvasElement.height;
  }

  set canvasSize(dimension: DimensionModel) {
    this.canvasWidth = dimension.width;
    this.canvasHeight = dimension.height;
    this.canvasElement.width = this.canvasWidth;
    this.canvasElement.height = this.canvasHeight;
    this.scaling = Number((dimension.width / originalCanvasWidth).toFixed(2));
  }

  renderLoop(deltaTimeSeconds: number) {
    this.clearCanvas();
    this.renderActiveEntities(deltaTimeSeconds, this.entityManager.activeEntities);
  }


  clearCanvas() {
    this.context.fillStyle = "#202020";
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  renderActiveEntities(deltaTime: number, entities: Entity[]) {
    this.context.fillStyle = "#ffcc00";
    for (let e of entities) {
      if (ComponentTypes.SPRITE & e.components && ComponentTypes.TRANSFORM & e.components)
        this.renderSprite(deltaTime, e)
    }
  }

  renderTestRect(x: number, y: number, w: number, h: number) {
    this.context.fillStyle = "#ffcc0066";
    this.context.fillRect(x, y, w, h);
  }

  renderPoint(x: number, y: number, colour = "#ffcc00") {
    this.context.fillStyle = colour;
    this.context.fillRect(x,y,10,10);
  }

  renderText(text: string) {
    this.context.fillText(text, 10, 10);
  }

  drawVert(from: {x: number, y: number}, to: {x: number, y: number}) {
    this.context.strokeStyle = "#ffcc00"
    this.context.beginPath();
    this.context.moveTo(from.x, from.y);
    this.context.lineTo(to.x, to.y);
    this.context.stroke();
    this.context.closePath();
}


  renderSprite(deltaTime: number, entity: Entity) {
    const components = this.componentManager.getComponentsForOwner(entity.id);
    const sprite = components[ComponentTypes.SPRITE] as Sprite;
    const transform = components[ComponentTypes.TRANSFORM] as Transform;
    if (sprite.ready) {
      let scale = this.scaling * transform.scale;
      if (components[ComponentTypes.CURSOR] && (<Cursor>components[ComponentTypes.CURSOR]).isHovering) {
        scale *= 1.12;
      }
      this.context.setTransform(scale, 0, 0, scale, transform.x * this.scaling, transform.y * this.scaling);
      this.context.drawImage(sprite.image, (-sprite.image.width / 2), (-sprite.image.height / 2));
      this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
  }


}
