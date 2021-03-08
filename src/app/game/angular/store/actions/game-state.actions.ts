import {createAction, props} from '@ngrx/store';
import {SaveStateTransfer} from '../../models/state/save-state.model';

export enum GameStateActionTypes {
  ASSIGN_STATE = "[Game State]: Assign properties to game state",
  ADD_ENERGY = "[Game State]: Add Energy",
  ADD_ORE = "[Game State]: Add Ore"
}

export const assignState = createAction(
  GameStateActionTypes.ASSIGN_STATE,
  props<{ overwrite: SaveStateTransfer }>()
);

export const addEnergy = createAction(
  GameStateActionTypes.ADD_ENERGY,
  props<{ energy: number }>()
);

export const addOre = createAction(
  GameStateActionTypes.ADD_ORE,
  props<{ ore: number }>()
);
