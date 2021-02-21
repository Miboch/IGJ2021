import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {GameState} from '../models/state/game-state';
import {gameStateReducer} from './reducers/game-state.reducer';


export const GameStateReducers: ActionReducerMap<GameState> = {
  game: gameStateReducer
}

export const getGameState = createFeatureSelector<GameState>('game');
