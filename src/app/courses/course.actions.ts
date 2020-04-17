import { createAction, props } from '@ngrx/store';

import { Course } from './model/course';

export const fetchCourses = createAction(
  '[Courses Resolver] Fetch Courses'
);

export const coursesLoaded = createAction(
  '[Fetch Courses Effect] Courses Loaded',
  props<{ courses: Course[] }>()
);
