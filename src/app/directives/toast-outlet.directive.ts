import {Directive, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';

@Directive({selector: '[igjToastOutlet]'})
export class ToastOutletDirective {
  constructor(public viewContainer: ViewContainerRef) {
  }
}
