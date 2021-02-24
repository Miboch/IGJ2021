import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver, HostListener,
  Injectable, Injector,
} from '@angular/core';
import {DebugWindowComponent} from '../components/debug-window/debug-window.component';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class DebuggingService {
  debugWindowFactory: ComponentFactory<DebugWindowComponent>;
  debugViewState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  showDebugWindow() {
    this.debugViewState.next(!this.debugViewState.value)
  }


  constructor(
    private resolver: ComponentFactoryResolver,
    private app: ApplicationRef,
    private inject: Injector) {
    this.debugWindowFactory = resolver.resolveComponentFactory(DebugWindowComponent);
    window.addEventListener('keydown', (key) => {
      if (key.code == "KeyQ")
        this.showDebugWindow();
    })
  }

  createDebuggingWindow() {
    let d = document.createElement('div');
    document.body.appendChild(d);
    let debug = this.debugWindowFactory.create(this.inject, [], d)
    this.app.attachView(debug.hostView);
    debug.instance.displaystateObservable = this.debugViewState;
  }

}

