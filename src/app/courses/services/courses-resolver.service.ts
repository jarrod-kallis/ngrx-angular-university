import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';

import { CoursesEntityService } from './courses-entity.service';

@Injectable()
export class CoursesResolverService implements Resolve<boolean> {
  constructor(
    private coursesEntityService: CoursesEntityService
  ) { }

  // NgRx Data Way
  resolve(): Observable<boolean> {
    console.log('[NgRx Data Pattern] Course Resolver: resolve()');

    // return this.coursesEntityService.getAll()
    //   .pipe(
    //     map(courses => !!courses)
    //   );

    return this.coursesEntityService.loaded$
      .pipe(
        tap(loaded => {
          // console.log('Courses loaded:', loaded);
          if (!loaded) {
            this.coursesEntityService.getAll();
          }
        }),
        // Only complete this observable once the data is loaded
        filter(loaded => loaded),
        // Take the first emitted value (of true) and complete
        first()
      );
  }
}
