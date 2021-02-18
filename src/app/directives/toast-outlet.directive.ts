import {
  ComponentFactory,
  ComponentFactoryResolver, ComponentRef,
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ToastService} from '../services/toast-service';
import {Subscription} from 'rxjs';
import {ToasterModel} from '../models/toaster.model';
import {ToastComponent} from '../components/toast/toast.component';

@Directive({selector: '[igjToastOutlet]'})
export class ToastOutletDirective implements OnInit, OnDestroy {

  toasterSubscription: Subscription;
  toasterFactory: ComponentFactory<ToastComponent>
  toastStack: ComponentRef<ToastComponent>[];

  constructor(public viewContainer: ViewContainerRef,
              private toastService: ToastService,
              private componentFactory: ComponentFactoryResolver) {
    this.toasterFactory = this.componentFactory.resolveComponentFactory(ToastComponent);
    this.toasterSubscription = new Subscription();
    this.toastStack = [];
  }

  ngOnInit() {
    this.toasterSubscription.add(
      this.toastService.toasterSubject.subscribe(toast => {
        this.createToast(toast);
      })
    )
  }

  ngOnDestroy() {
    this.toasterSubscription.unsubscribe();
  }

  createToast(data: ToasterModel) {
    const toastComponent = this.viewContainer.createComponent(this.toasterFactory);
    toastComponent.instance.message = data.text;
    toastComponent.instance.title = data.title;
    toastComponent.instance.type = data.type;
    this.toasterSubscription.add(
      toastComponent.instance.closeButtonEmitter.subscribe(r => {
        const idx = this.toastStack.findIndex(e => e == toastComponent);
        const heightOffset = toastComponent.instance.wrapperReference.nativeElement.getBoundingClientRect().height;
        const toastSlice = this.toastStack.slice(idx);
        toastComponent.destroy();
        toastSlice.forEach(toaster => {
          toaster.instance.bottom -= heightOffset;
        });
      })
    );
    setTimeout(() => {
      let heightOffset = toastComponent.instance.wrapperReference.nativeElement.getBoundingClientRect().height;
      this.toastStack.forEach(toastInStack => {
        toastInStack.instance.bottom += heightOffset;
      });
      this.toastStack.unshift(toastComponent);
    });
  }

}
