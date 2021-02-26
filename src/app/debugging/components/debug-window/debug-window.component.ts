import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TimerSystem} from '../../../game/systems/timer.system';

@Component({
  templateUrl: './debug-window.component.html',
  styleUrls: ['./debug-window.component.scss']
})

export class DebugWindowComponent implements OnInit {
  displayObserve: Observable<boolean>;
  setPaused = true;
  constructor(private timer: TimerSystem) {
    this.displayObserve = new Observable<boolean>();
  }

  ngOnInit(): void {
  }

  set displaystateObservable(observable: Observable<boolean>) {
    this.displayObserve = observable;
  }

  pauseUnpause() {
    this.timer.pause = this.setPaused;
    this.setPaused = !this.setPaused;
  }

}
