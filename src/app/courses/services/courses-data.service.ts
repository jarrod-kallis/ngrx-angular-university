import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { COURSE_ENTITY_NAME } from '../course.types';

// NgRx Data Service that customises how and where we interact with our backend for this entity
@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super(COURSE_ENTITY_NAME, http, httpUrlGenerator);
  }

  // Override the default getAll()
  getAll(): Observable<Course[]> {
    return this.http.get('/api/courses')
      .pipe(
        map(res => res['payload']),
        tap(courses => console.log('Courses Data Service getAll():', courses))
      );
  }
}
