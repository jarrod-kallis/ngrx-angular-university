import { createAction, props } from '@ngrx/store';

import { Course } from './model/course';
import { Update } from '@ngrx/entity';

export const fetchCourses = createAction(
  '[Courses Resolver] Fetch Courses'
);

export const coursesLoaded = createAction(
  '[Fetch Courses Effect] Courses Loaded',
  props<{ courses: Course[] }>()
);

export const courseUpdated = createAction(
  '[Edit Course Dialog] Course Updated',
  props<{ course: Update<Course> }>()
);
