import {Injectable} from '@angular/core';
import {of, Subject} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {DimensionModel} from '../angular/models/dimension.model';

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

  constructor() {
    this.animationEvent.pipe(
      switchMap(frameTime => {
        let time = of(frameTime - this.lastFrame);
        this.lastFrame = frameTime;
        return time;
      }),
      filter(_ => this._animating && Boolean(this.canvasElement))
    ).subscribe(deltaTime => {
      this.clearCanvas();
      this.renderActiveEntities(deltaTime);
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

  renderActiveEntities(deltaTime: number) {
    this.context.fillStyle = "#ffcc00";
    this.context.fillRect(40 * this.scaling, 40 * this.scaling, 200 * this.scaling, 200 * this.scaling);
  }

  clearCanvas() {
    this.context.fillStyle = "#101010";
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
  }


}
