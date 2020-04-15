import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { noop } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AppState } from '../../reducers';
import { login } from '../auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });
  }

  ngOnInit() { }

  login() {
    const formValue = this.form.value;

    this.auth.login(formValue.email, formValue.password)
      .pipe(
        tap(user => {
          console.log(user);

          this.store.dispatch(login({ user }));

          this.router.navigate(['courses']);
        })
      )
      .subscribe(
        noop,
        error => alert('Unable to login. ' + error.message)
      );
  }

}

