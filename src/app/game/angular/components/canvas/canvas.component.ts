import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'igj-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})

export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('cvs') canvas!: ElementRef<HTMLCanvasElement>;
  @Input() width: number = 800;
  @Input() height: number = 600;
  ctx!: CanvasRenderingContext2D;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.onCanvasReady();
  }


  onCanvasReady() {
      this.ctx = <CanvasRenderingContext2D>this.canvas.nativeElement.getContext("2d");
      this.ctx.fillStyle = "#101010";
      this.ctx.fillRect(0, 0, this.width, this.height);
  }

  get widthInPix() {
    return this.width + "px";
  }

  get heightInPx() {
    return this.height + "px";
  }

}
