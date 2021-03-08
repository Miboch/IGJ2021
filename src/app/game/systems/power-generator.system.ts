import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {addEnergy, GameState, getGameState, SaveStateModel} from '../angular';
import {TimerSystem} from './timer.system';
import {CursorSystem} from './cursor.system';
import {ComponentTypes} from '../components/component-types';
import {ComponentManagerSystem} from './component-manager.system';
import {PowerGenerator} from '../components/power-generator';
import {Entity} from '../entities/entity';

@Injectable({providedIn: 'root'})
export class PowerGeneratorSystem {
  private updatesPerSecond = 1;
  private gameState?: SaveStateModel;
  private energyPerSatellite = 1;

  constructor(private store: Store<GameState>, private timer: TimerSystem, private cursor: CursorSystem, private components: ComponentManagerSystem) {
    this.store.select(getGameState).subscribe(gameState => {
      this.gameState = gameState;
    })

    this.timer.getWithUPS(this.updatesPerSecond).subscribe(() => {
      if (!this.gameState) return;
      this.store.dispatch(addEnergy({energy: this.gameState.satellites * this.energyPerSatellite}))
    });
    this.cursor.listenForClickedEntities().subscribe(entities => {
      this.generatePower(
        entities.filter(entity => (ComponentTypes.CURSOR + ComponentTypes.POWER_GENERATOR) & entity.components))
    });
  }

  generatePower(entities: Entity[]) {
    let energySum = 0;
    entities.forEach(clickedEntity => {
      let comps = this.components.getComponentsForOwner(clickedEntity.id);
      let generator = comps[ComponentTypes.POWER_GENERATOR] as PowerGenerator;
      energySum += generator.generationValue;
    })
    this.store.dispatch(addEnergy({energy: energySum}))
  }

}
