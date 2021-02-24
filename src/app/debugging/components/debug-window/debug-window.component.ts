import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  templateUrl: './debug-window.component.html',
  styleUrls: ['./debug-window.component.scss']
})

export class DebugWindowComponent implements OnInit {
  displayObserve: Observable<boolean>;

  constructor() {
    this.displayObserve = new Observable<boolean>();
  }

  ngOnInit(): void {
  }

  set displaystateObservable(observable: Observable<boolean>) {
    this.displayObserve = observable;
  }

}
