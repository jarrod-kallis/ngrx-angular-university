import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Course, compareCourses } from '../model/course';
import CourseActions from '../course.actions-types';

export interface CourseState extends EntityState<Course> {
  // courses: Course[]; // I've added the array of courses just for fun. The entities state framework is the way to go.
  allCoursesLoaded: boolean; // We use this flag to indicate that we have attempted to load the courses from the backend

  // Extending EntityState provides the entities map,
  //   and the ids field (which provides the order in which the Courses must be displayed)
  // entities: { [key: number]: Course };
  // ids: number[]; // Defines the order in which the Courses are displayed
}

const adapter: EntityAdapter<Course> = createEntityAdapter<Course>({
  sortComparer: compareCourses, // Will alter the ids[] so that the Courses are displayed in the correct order
  // selectId: course => course.id // 'id' is the default field name that the EntityAdapter will use anyway
});

const initialState: CourseState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const courseReducer = createReducer(
  initialState,

  on(CourseActions.coursesLoaded, (state, action) => {
    return adapter.addAll(action.courses, {
      ...state,
      allCoursesLoaded: true
    });
  })
);

export const { selectAll } = adapter.getSelectors();
