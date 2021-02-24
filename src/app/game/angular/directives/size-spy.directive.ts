import {AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {DimensionModel} from '../models/dimension.model';

@Directive({selector: '[igjSizeSpy]'})
export class SizeSpyDirective implements AfterViewInit {
  @Output() sizeEvent: EventEmitter<DimensionModel>

  constructor(private attachedElement: ElementRef) {
    this.sizeEvent = new EventEmitter<DimensionModel>();
  }

  @HostListener("window:resize", ["$event"])
  onWindowResizing(resize: any) {
    this.sizeEvent.emit(this.getDimension());
  }

  ngAfterViewInit() {
    let i = setInterval(() => {
      if (this.attachedElement.nativeElement) {
        this.sizeEvent.emit(this.getDimension());
        clearInterval(i);
      }
    }, 100)
  }

  getDimension(): DimensionModel {
    let bounds = (<HTMLElement>this.attachedElement.nativeElement).getBoundingClientRect();
    return {width: bounds.width, height: Math.floor(bounds.width * 0.66)}
  }

}
