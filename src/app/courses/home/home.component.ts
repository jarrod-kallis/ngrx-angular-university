import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

import { Course } from '../model/course';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { CoursesEntityService } from '../services/courses-entity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  promoTotal$: Observable<number>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private coursesEntityService: CoursesEntityService
  ) {
    console.log('Courses Home Component created');
  }

  ngOnInit() {
    console.log('Courses Home Component Init');
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.coursesEntityService.entities$
      .pipe(
        map(courses => courses.filter(course => course.category === 'BEGINNER'))
      );

    this.advancedCourses$ = this.coursesEntityService.entities$
      .pipe(
        map(courses => courses.filter(course => course.category === 'ADVANCED'))
      );

    this.promoTotal$ = this.coursesEntityService.entities$
      .pipe(
        map(courses => courses.filter(course => course.promo).length)
      );
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
