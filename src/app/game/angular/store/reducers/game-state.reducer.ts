﻿import {Action, createReducer, on} from '@ngrx/store';
import * as gameActions from '../actions/game-state.actions';
import {SaveStateModel} from '../../models/state/save-state.model';

/**
 * Here we define how the game state should be for fresh games.
 *
 * The default will automatically be applied to the game unless the user has a saved game which will replace the default
 * state on application load
 *
 * TODO: handle game load and deserialize saved state.
 * TODO: create profile page where user can manually save/upload their progress, or restore their progress
 */
export const defaultGameState: SaveStateModel = {
  lastUpdated: new Date(),
  ore: 0,
  energy: 0,
  drills: 0,
  satellites: 0,
  drillFactories: 0,
  satelliteFactories: 0
}

/**
 * Add actions using the on() syntax as needed here.
 * For most cases we should be able to utilize the Object.assign action.
 *
 * However if you need something more performant simply write a more discriminating reducer.
 */
const gameReducer = createReducer(
  defaultGameState,
  on(gameActions.assignState, (state, {overwrite}) => {
    const newState = {...state} // sets previous properties
    Object.assign(newState, overwrite);
    return newState;
  }),
  on(gameActions.addEnergy, (state, { energy }) => ({ ...state, energy: state.energy + energy })),
  on(gameActions.addOre, (state, { ore }) => ({ ...state, ore: state.ore + ore }))
);

export function gameStateReducer(state: SaveStateModel | undefined = defaultGameState, action: Action) {
  return gameReducer(state, action);
};
