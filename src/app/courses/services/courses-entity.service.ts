import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';

import { Course } from '../model/course';
import { COURSE_ENTITY_NAME } from '../course.types';

// This facade service allows NgRx Data to communicate with our back end to query, add, update & delete Courses,
// as well as query the Redux store (which it refers to as cache).
// It assumes some conventions have been followed WRT the REST service endpoints eg. /api/<entity name>s, but this can be overwritten
@Injectable()
export class CoursesEntityService extends EntityCollectionServiceBase<Course> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private http: HttpClient) {
    // 'Course' = entity name (Used in the Course Module's EntityMetadataMap)
    super(COURSE_ENTITY_NAME, serviceElementsFactory);
  }
}
