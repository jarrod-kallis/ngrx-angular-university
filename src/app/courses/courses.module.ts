import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';

import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { CoursesHttpService } from './services/courses-http.service';
import { EditCourseDialogComponent } from './edit-course-dialog/edit-course-dialog.component';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { compareCourses, Course } from './model/course';
import { compareLessons, Lesson } from './model/lesson';
import { CoursesResolverService } from './services/courses-resolver.service';
import { CoursesEntityService } from './services/courses-entity.service';
import { CoursesDataService } from './services/courses-data.service';

import { COURSE_ENTITY_NAME } from './course.types';

export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: [CoursesResolverService]
  },
  {
    path: ':courseUrl',
    component: CourseComponent,
    resolve: [CoursesResolverService]
  }
];

const entityMetadata: EntityMetadataMap = {
  // Entity name
  [COURSE_ENTITY_NAME]: {
    // entityName: 'Course', // Not necessary, because it's the same as the map's key
    sortComparer: compareCourses, // Will alter the ids[] so that the Courses are displayed in the correct order
    // selectId: (course: Course) => course.id // 'id' is the default field name that NgRx Data will use anyway
    entityDispatcherOptions: {
      optimisticUpdate: true, // Update the Redux store immediately on save (Call REST APi in the background)
      optimisticDelete: true, // This is the default
      optimisticAdd: false // This is the default
    }
  }
};

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    RouterModule.forChild(coursesRoutes)
  ],
  declarations: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  exports: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  entryComponents: [EditCourseDialogComponent],
  providers: [
    CoursesHttpService,
    CoursesResolverService,
    CoursesEntityService,
    CoursesDataService
  ]
})
export class CoursesModule {
  // Course module is lazy loaded so we need to inject the EntityDefinitionService,
  // and register the EntityMetadataMap, above, with it.
  // What this does is associate NgRx Data's Entity Metadata Map with this module's entity map.
  // Same goes for the data service. It associates NgRx Data's Entity Data Service with our custom one for this module's entities,
  // so it will no longer use it's default data service to interact with our backend.
  constructor(
    entityDefinitionService: EntityDefinitionService,
    entityDataService: EntityDataService,
    coursesDataService: CoursesDataService
  ) {
    entityDefinitionService.registerMetadataMap(entityMetadata);
    entityDataService.registerService(COURSE_ENTITY_NAME, coursesDataService);
  }
}
