import { createAction, props } from '@ngrx/store';

import { User } from './model/user.model';

export const login = createAction(
  '[Login Page] Login',
  props<{ user: User }>()
);

export const logout = createAction(
  '[Menu] Logout'
);
