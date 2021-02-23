import {createSelector} from '@ngrx/store';
import {getUserState} from '../index';
import {UserStateModel} from '../../models/state/user-state.model';
import {UserInformationModel} from '../../models/user-information.model';

export const username = createSelector(
  getUserState,
  (state: UserStateModel) => state.name
);

export const isLoggedIn = createSelector(
  getUserState,
  (state: UserStateModel) => Boolean(state.name && state.exp > Math.floor(Date.now() / 1000))
)

export const userId = createSelector(
  getUserState,
  (state: UserStateModel) => state.id
);

export const userRole = createSelector(
  getUserState,
  (state: UserStateModel) => state.role
);

export const userDetails = createSelector(
  getUserState,
  (state: UserStateModel) => ({username: state.name, id: state.id, role: state.role} as UserInformationModel)
)

export const getUserToken = createSelector(
  getUserState,
  (state: UserStateModel) => state.token
);
