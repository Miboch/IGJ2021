﻿import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RendererSystem} from '../../../systems/renderer.system';
import {DimensionModel} from '../../models/dimension.model';
import {CursorSystem} from '../../../systems/cursor.system';

@Component({
  selector: 'igj-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cvs') canvas!: ElementRef<HTMLCanvasElement>;
  @Input() width: number = 990;
  @Input() height: number = 650;

  constructor(private render: RendererSystem, private cursor: CursorSystem) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const checkCanvas = setInterval(() => {
      if (this.canvas) {
        clearInterval(checkCanvas)
        this.onCanvasReady();
      }
    }, 10);
  }

  ngOnDestroy() {
  }

  onCanvasReady() {
    this.render.canvasTarget = this.canvas.nativeElement;
    this.cursor.attachedElement = this.canvas.nativeElement;
  }

  get pxHeight() {
    return this.height + "px";
  }

  get pxWidth() {
    return this.width + "px";
  }

  resizeCanvas(dim: DimensionModel) {
    this.width = dim.width;
    this.height = dim.height;
    this.render.canvasSize = dim;
  }

}
