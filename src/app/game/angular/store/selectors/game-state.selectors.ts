import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {GameState} from '../../models';
import {SaveStateModel} from '../../models';

const getFullState = createFeatureSelector<GameState>('game');

export const getGameState: MemoizedSelector<object, any> = createSelector(
  getFullState,
  (state: GameState) => state.game
);

/**
 * example selector, for only getting lastUpdated
 */

export const getLastUpdated: MemoizedSelector<object, any> = createSelector(
  getGameState,
  (saveState: SaveStateModel) => saveState.lastUpdated
);

export const getEnergy: MemoizedSelector<object, any> = createSelector(
  getGameState,
  (saveState: SaveStateModel) => saveState.energy
);

export const getOre: MemoizedSelector<object, any> = createSelector(
  getGameState,
  (saveState: SaveStateModel) => saveState.ore
);
