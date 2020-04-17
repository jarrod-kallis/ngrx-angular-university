import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Course } from '../model/course';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { AppState } from '../../reducers';
import { selectAllBeginnerCourses, selectAllAdvancedCourses, selectPromoTotal } from '../course.selectors';

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
    private store: Store<AppState>
  ) {
    console.log('Courses Home Component created');
  }

  ngOnInit() {
    console.log('Courses Home Component Init');
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.store.select(selectAllBeginnerCourses);
    this.advancedCourses$ = this.store.select(selectAllAdvancedCourses);
    this.promoTotal$ = this.store.select(selectPromoTotal);
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
