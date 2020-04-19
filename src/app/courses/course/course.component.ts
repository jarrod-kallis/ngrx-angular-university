import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom } from 'rxjs/operators';

import { Lesson } from '../model/lesson';
import { Course } from '../model/course';
import { CoursesEntityService } from '../services/courses-entity.service';
import { LessonsEntityService } from '../services/lessons-entity.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  PAGE_SIZE = 3;

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;
  loading$: Observable<boolean>;

  displayedColumns = ['seqNo', 'description', 'duration'];
  nextPage = 0;

  constructor(
    private route: ActivatedRoute,
    private coursesEntityService: CoursesEntityService,
    private lessonsEntityService: LessonsEntityService
  ) {
    console.log('Course Component constructor');
  }

  ngOnInit() {
    console.log('Course Component init');
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');

    this.course$ = this.coursesEntityService.entities$
      .pipe(
        map(courses => courses.find(course => course.url === courseUrl))
      );

    this.lessons$ = this.lessonsEntityService.entities$
      .pipe(
        withLatestFrom(this.course$),
        map(([lessons, course]) => {
          const courseLessons = lessons.filter(lesson => lesson.courseId === course.id);

          // Work out how many pages we've loaded already based on what's in the store
          this.nextPage = Math.ceil(courseLessons.length / this.PAGE_SIZE);

          return [courseLessons, course];
        }),
        tap(([lessons, course]: [Lesson[], Course]) => {
          if (this.nextPage === 0) {
            this.loadLessonsPage(course);
          }
        }),
        map(([lessons, course]) => lessons)
      );

    // The delay is necessary here, because the loading indicator is both true & false
    // within the same change detection run if we call loadLessonsPage above (which is done the first time for each course)
    this.loading$ = this.lessonsEntityService.loading$
      .pipe(
        delay(0)
      );
  }

  loadLessonsPage(course: Course) {
    this.lessonsEntityService.getWithQuery({
      courseId: course.id.toString(),
      sortOrder: 'asc',
      pageNumber: this.nextPage.toString(),
      pageSize: this.PAGE_SIZE.toString()
    });

    this.nextPage++;
  }
}
