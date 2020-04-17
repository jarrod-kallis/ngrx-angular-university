import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '../../environments/environment';

export interface AppState {
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  // Needs to return a reducer signature
  return (state: AppState, action) => {
    // Let's wait until we have the Redux state set up
    if (state) {
      // Destructure the router state out of the Redux state - we're not interested in logging that
      const { router, ...noRouterState } = state;
      // Log the state before the action is handled by any other reducer
      console.log('State before action: ' + action.type, action, noRouterState);
    }

    // Return the result of calling all the other reducers
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = environment.production ? [] : []; // [logger];
