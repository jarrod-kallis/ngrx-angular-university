import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { switchMap, map, tap, concatMap } from 'rxjs/operators';

import CourseActions from './course.actions-types';
import { CoursesHttpService } from './services/courses-http.service';

@Injectable()
export class CourseEffects {
  constructor(private actions$: Actions, private router: Router, private courseService: CoursesHttpService) { }

  fetchCourses$ = createEffect(() => this.actions$
    .pipe(
      ofType(CourseActions.fetchCourses),
      concatMap(() => this.courseService.findAllCourses()),
      map(courses => CourseActions.coursesLoaded({ courses }))
    ));

  // coursesLoaded$ = createEffect(() => this.actions$
  //   .pipe(
  //     ofType(CourseActions.coursesLoaded),
  //     tap(a => console.log('here:', a))
  //   ), { dispatch: false });

  // login$ = createEffect(() => this.actions$
  //   .pipe(
  //     ofType(AuthActions.login),
  //     tap(loginAction => localStorage.setItem(USER, JSON.stringify(loginAction.user)))
  //   ),
  //   { dispatch: false });
}
