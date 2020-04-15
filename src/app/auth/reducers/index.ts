import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';

import { User } from '../model/user.model';
import AuthActions from '../auth.action-types';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      user: action.user
    };
  })

);
