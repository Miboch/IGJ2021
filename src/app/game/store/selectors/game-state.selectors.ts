import {createSelector, MemoizedSelector} from '@ngrx/store';
import {getGameState} from '../index';
import {GameState} from '../../models/state/game-state';
import {SaveStateModel} from '../../models/save-state.model';

export const getSaveState: MemoizedSelector<object, any> = createSelector(
  getGameState,
  (state: GameState) => state.game
);

/**
 * example selector, for only getting lastUpdated
 */

export const getLastUpdated: MemoizedSelector<object, any> = createSelector(
  getSaveState,
  (saveState: SaveStateModel) => saveState.lastUpdated
);
