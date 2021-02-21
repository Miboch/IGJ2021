import {createSelector, MemoizedSelector} from '@ngrx/store';
import {getFullState} from '../index';
import {GameState} from '../../models/state/game-state';
import {SaveStateModel} from '../../models/state/save-state.model';


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
