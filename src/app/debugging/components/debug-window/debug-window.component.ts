import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs';
import { addEnergy, addOre, GameState } from 'src/app/game/angular';
import {TimerSystem} from '../../../game/systems/timer.system';

@Component({
  templateUrl: './debug-window.component.html',
  styleUrls: ['./debug-window.component.scss']
})

export class DebugWindowComponent implements OnInit {
  displayObserve: Observable<boolean>;
  setPaused = true;
  constructor(private timer: TimerSystem, private store: Store<GameState>) {
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

  addEnergy(amount: number) {
    this.store.dispatch(addEnergy( { energy: amount } ))
  }

  addOre(amount: number) {
    this.store.dispatch(addOre( { ore: amount } ))
  }
}
