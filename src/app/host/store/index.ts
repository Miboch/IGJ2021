import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {ApplicationState} from '../models/state/application-state';
import {userStateReducer} from './reducers/user-reducer';
import {UserStateModel} from '../models/state/user-state.model';

export const ApplicationReducer: ActionReducerMap<ApplicationState> = {
  user: userStateReducer
}

export const getUserState = createFeatureSelector<UserStateModel>('user')
