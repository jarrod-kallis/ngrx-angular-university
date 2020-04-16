import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { AppState } from '../reducers';
import { isLoggedIn } from './auth.selectors';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(isLoggedIn)
      .pipe(
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigateByUrl('login');
          }
        })
      );
  }
}
