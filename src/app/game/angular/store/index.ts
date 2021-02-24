import {ActionReducerMap} from '@ngrx/store';
import {GameState} from '../models';
import {gameStateReducer} from './reducers';


export const GameStateReducers: ActionReducerMap<GameState> = {
  game: gameStateReducer
}

export * from './selectors';
export * from './actions';
export * from './reducers';
