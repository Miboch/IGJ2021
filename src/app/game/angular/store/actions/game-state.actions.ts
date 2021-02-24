import {createAction, props} from '@ngrx/store';
import {SaveStateTransfer} from '../../models/state/save-state.model';

export enum GameStateActionTypes {
  ASSIGN_STATE = "[Game State]: Assign properties to game state"
}

export const assignState = createAction(
  GameStateActionTypes.ASSIGN_STATE,
  props<{ overwrite: SaveStateTransfer }>()
);
