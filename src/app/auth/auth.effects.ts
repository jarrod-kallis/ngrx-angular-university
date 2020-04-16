import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';

import AuthActions from './auth.action-types';
import { USER } from '../common/types';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {
    // this.actions$.subscribe(console.log);
  }

  login$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.login),
      tap(loginAction => localStorage.setItem(USER, JSON.stringify(loginAction.user)))
    ),
    { dispatch: false });

  logout$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem(USER);
        this.router.navigateByUrl('login');
      })
    ),
    { dispatch: false });
}
