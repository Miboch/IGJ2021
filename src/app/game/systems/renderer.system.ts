import {Injectable} from '@angular/core';
import {of, Subject} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RendererSystem {

  _animating = false;
  lastFrame: number = 0;
  animationEvent: Subject<number> = new Subject<number>();
  canvasElement!: HTMLCanvasElement;

  constructor() {
    this.animationEvent.pipe(
      switchMap(frameTime => {
        let time = of(frameTime - this.lastFrame);
        this.lastFrame = frameTime;
        return time;
      }),
      filter(_ => this._animating && Boolean(this.canvasElement))
    ).subscribe(deltaTime => {
      this.renderActiveEntities(deltaTime);
    })
  }

  set canvasTarget(canvas: HTMLCanvasElement) {
    this.canvasElement = canvas;
  }

  set animating(bool: boolean) {
    this._animating = bool;
  }

  animationLoop(time: number) {
    this.animationEvent.next(time);
    requestAnimationFrame((ev) => this.animationLoop(ev));
  }

  renderActiveEntities(deltaTime: number) {

  }



}
