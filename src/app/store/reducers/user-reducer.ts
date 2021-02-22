import {Action, createReducer, on} from '@ngrx/store';
import {UserStateModel} from '../../models/state/user-state.model';
import * as userAction from '../actions/user.actions';
import {state} from '@angular/animations';

export const defaultUserState: UserStateModel = {
  exp: 0,
  id: "",
  jwt: {},
  name: "",
  role: "",
  token: ""
}

export const userReducer = createReducer(
  defaultUserState,
  on(userAction.loginSuccess, (state, {jwt}) => ({
    role: jwt.roles.name,
    jwt: jwt,
    exp: jwt.exp,
    id: jwt.sub,
    name: jwt.name,
    token: jwt.token
  })),
  on(userAction.logout, (state) => {
    return defaultUserState
  })
);

export function userStateReducer(state: UserStateModel | undefined = defaultUserState, action: Action) {
  return userReducer(state, action);
}
