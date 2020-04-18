import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';

import { AppState } from '../../reducers';
import { areAllCoursesLoaded } from '../course.selectors';
import CourseActions from '../course.actions-types';

@Injectable()
export class CoursesResolverService implements Resolve<boolean> {
  constructor(private store: Store<AppState>) { }

  resolve(): Observable<boolean> {
    console.log('Course Resolver: resolve()');

    return this.store.select(areAllCoursesLoaded)
      .pipe(
        tap(coursesLoaded => {
          if (!coursesLoaded) {
            this.store.dispatch(CourseActions.fetchCourses());
          }
        }),
        // Filtering the observable on coursesLoaded prevents the observable from
        // completing until we have received the courses from the backend
        // (otherwise the courses URL route would display immediately)
        filter(coursesLoaded => coursesLoaded),
        // Taking the first emitted value will complete theis observable and allow the URL route to be displayed
        first()
      );
  }
}
