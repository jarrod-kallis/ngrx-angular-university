import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { AppState } from './reducers';
import { AuthState } from './auth/reducers';
import { isLoggedIn } from './auth/auth.selectors';
import { logout } from './auth/auth.actions';
import { USER } from './common/types';
import AuthActions from './auth/auth.action-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;

  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    console.log('App Init');

    this.isLoggedIn$ = this.store.select(isLoggedIn);

    if (localStorage.getItem(USER)) {
      this.store.dispatch(AuthActions.login({ user: JSON.parse(localStorage.getItem(USER)) }));
    }

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  logout() {
    this.store.dispatch(logout());
  }

}
