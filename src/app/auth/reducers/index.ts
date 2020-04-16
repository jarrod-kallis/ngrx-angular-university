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
    // Mutate the state to test that we can't do it
    // state.user = action.user;
    // return state;

    return {
      ...state,
      user: action.user
    };
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      ...state,
      user: null
    };
  })
);
