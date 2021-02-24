import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState } from '../models/state/game-state';
import { assignState } from '../store/actions/game-state.actions';
import { getGameState } from '../store/selectors/game-state.selectors';

const timeoutMilliseconds = 1000;

@Injectable({
  providedIn: 'root',
})
export class GameLoopService {
  state?: GameState;
  interval?: number;

  constructor(private store: Store<GameState>) {
    // either just keep a copy of the state in the subscribe handler
    // or calculated needed values there, and store in variables on this service;
    // don't need to unsubscribe since this lasts the lifetime of the app
    this.store.select(getGameState).subscribe(state => {
      this.state = state
    });
    this.startGameLoop();
  }

  startGameLoop() {
    this.interval = window.setInterval(() => {
      this.gameLoop();
    }, timeoutMilliseconds);
  }

  stopGameLoop() {
    clearInterval(this.interval);
  }

  private gameLoop() {
    if (!this.state) return;
    // increment resources here like so
    // let newState = { overwrite: {} };
    // newState.overwrite = { something: 123 };
    // this.store.dispatch(assignState(newState));
  }
}
