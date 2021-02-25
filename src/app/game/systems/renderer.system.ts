import {Injectable} from '@angular/core';
import {of, Subject} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {DimensionModel} from '../angular/models/dimension.model';
import {EntityManagerSystem} from './entity-manager.system';
import {Entity} from '../entities/entity';
import {ComponentTypes} from '../components/component-types';
import {ComponentManagerSystem} from './component-manager.system';
import {Sprite} from '../components/sprite';
import {Transform} from '../components/transform';

const originalCanvasWidth = 990;

@Injectable({providedIn: 'root'})
export class RendererSystem {
  private canvasElement!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private canvasWidth = 0;
  private canvasHeight = 0;
  private _animating = false;
  private scaling = 1;

  lastFrame: number = 0;
  animationEvent: Subject<number> = new Subject<number>();

  constructor(private entityManager: EntityManagerSystem, private componentManager: ComponentManagerSystem) {
    this.animationEvent.pipe(
      switchMap(frameTime => {
        let time = of(frameTime - this.lastFrame);
        this.lastFrame = frameTime;
        return time;
      }),
      filter(_ => this._animating && Boolean(this.canvasElement))
    ).subscribe(deltaTime => {
      this.clearCanvas();
      this.renderActiveEntities(deltaTime, this.entityManager.activeEntities);
    })
  }

  set canvasTarget(canvas: HTMLCanvasElement) {
    this.canvasElement = canvas;
    this.context = this.canvasElement.getContext('2d') as CanvasRenderingContext2D;
    this.canvasWidth = this.canvasElement.width;
    this.canvasHeight = this.canvasElement.height;
  }

  set animating(bool: boolean) {
    this._animating = bool;
  }

  set canvasSize(dimension: DimensionModel) {
    this.canvasWidth = dimension.width;
    this.canvasHeight = dimension.height;
    this.canvasElement.width = this.canvasWidth;
    this.canvasElement.height = this.canvasHeight;
    this.scaling = Number((dimension.width / originalCanvasWidth).toFixed(2));
  }

  animationLoop(time: number) {
    this.animationEvent.next(time);
    requestAnimationFrame((ev) => this.animationLoop(ev));
  }

  clearCanvas() {
    this.context.fillStyle = "#101010";
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  renderActiveEntities(deltaTime: number, entities: Entity[]) {
    this.context.fillStyle = "#ffcc00";
    for (let e of entities) {
      if (ComponentTypes.SPRITE & e.components && ComponentTypes.TRANSFORM & e.components)
        this.renderSprites(deltaTime, e)
    }
  }

  renderSprites(deltaTime: Number, entity: Entity) {
    const components = this.componentManager.getComponentsForOwner(entity.id);
    const sprite = components[ComponentTypes.SPRITE] as Sprite;
    const transform = components[ComponentTypes.TRANSFORM] as Transform;
    if (sprite.ready) {
      const scale = this.scaling * transform.scale;
      // this.context.translate(this.canvasElement.width / 2, this.canvasElement.height / 2)
      this.context.setTransform(scale, 0, 0, scale, transform.x * this.scaling, transform.y * this.scaling);
      this.context.rotate(transform.rot+= 0.1);
      transform.x += 1;
      if(transform.x > this.canvasWidth) transform.x = 0;
      this.context.drawImage(sprite.image,  (-sprite.image.width / 2), (-sprite.image.height / 2));
      this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
  }


}
