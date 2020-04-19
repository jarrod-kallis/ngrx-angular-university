import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';

import { Lesson } from '../model/lesson';
import { LESSON_ENTITY_NAME } from '../course.types';

// This facade service allows NgRx Data to communicate with our back end to query, add, update & delete Lessons,
// as well as query the Redux store (which it refers to as cache).
// It assumes some conventions have been followed WRT the REST service endpoints eg. /api/<entity name>s, but this can be overwritten
@Injectable()
export class LessonsEntityService extends EntityCollectionServiceBase<Lesson> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private http: HttpClient) {
    super(LESSON_ENTITY_NAME, serviceElementsFactory);
  }
}
