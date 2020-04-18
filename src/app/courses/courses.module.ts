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
import { StoreModule } from '@ngrx/store';
import { courseReducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './course.effects';
import { CoursesResolverService } from './services/courses-resolver.service';

export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: [CoursesResolverService]
  },
  {
    path: ':courseUrl',
    component: CourseComponent
  }
];

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
    RouterModule.forChild(coursesRoutes),
    StoreModule.forFeature('course', courseReducer),
    EffectsModule.forFeature([CourseEffects])
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
    CoursesResolverService
  ]
})
export class CoursesModule {
  constructor() { }
}
