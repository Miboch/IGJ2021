import {Injectable} from '@angular/core';
import { Store } from '@ngrx/store';
import { addEnergy, GameState } from '../angular';
import { TimerSystem } from './timer.system';

@Injectable({providedIn: 'root'})
export class PowerGeneratorSystem {
  private updatesPerSecond = 1;
  private gameState?: GameState;
  private energyPerSatellite = 1;

  constructor(private store: Store<GameState>, private timer: TimerSystem) {
    this.store.subscribe(gameState => {
      this.gameState = gameState;
    });
    this.timer.getWithUPS(this.updatesPerSecond).subscribe(() => {
      if (!this.gameState) return;
      this.store.dispatch(addEnergy( { energy: this.gameState.game.satellites * this.energyPerSatellite } ))
    });
  }
}
