import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AuthState } from './reducers';

const getAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
  getAuthState,
  (authState: AuthState) => !!authState.user
);

// Dummy selector to show how another selector, ie isLoggedIn, can be used as an input function
// const isLoggedOut = createSelector(
//   isLoggedIn,
//   loggedIn => !loggedIn
// );
