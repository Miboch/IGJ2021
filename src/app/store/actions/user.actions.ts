import {createAction, props} from '@ngrx/store';
import {DeserializedJwtModel} from '../../models/deserialized-jwt.model';

export enum UserActionTypes {
  LOGIN_SUCCESS = "[User] Login Successful",
  LOGOUT = "[User] Logout"
}

export const loginSuccess = createAction(
  UserActionTypes.LOGIN_SUCCESS,
  props<{jwt: DeserializedJwtModel}>()
);

export const logout = createAction(
  UserActionTypes.LOGOUT
);
