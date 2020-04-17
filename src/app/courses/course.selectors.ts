import { createSelector, createFeatureSelector } from '@ngrx/store';

import { CourseState, selectAll } from './reducers';

const selectCourseState = createFeatureSelector<CourseState>('course');

// export const getAllCourses = createSelector(
//   selectCourseState,
//   state => state.courses
// );

export const selectAllCourses = createSelector(
  selectCourseState,
  state => selectAll(state)
);

export const selectAllBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === 'BEGINNER')
);

export const selectAllAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);

export const areAllCoursesLoaded = createSelector(
  selectCourseState,
  state => state.allCoursesLoaded
);
