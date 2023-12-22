// student-form.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { Student } from '../../models/student.model';
import { Course } from '../../models/course.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent implements OnInit {
  student: Student = {
    studentId: 0,
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    gender: '',
    email: '',
    phoneNumber: '',
    courseId: 0,
  };

  courses: Course[] = [];

  constructor(
    private router: Router,
    private studentService: StudentService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(
      (data: Course[]) => {
        console.log('Courses:', data);
        this.courses = data;
      },
      (error) => {
        console.error('Error fetching courses:', error);
        // You can choose to handle the error or simply log it
      }
    );
  }

  saveStudent(): void {
    this.studentService.createStudent(this.student).subscribe(
      () => {
        this.router.navigate(['/students']);
      },
      (error) => {
        console.error('Error saving student:', error);
        // Handle error as needed, e.g., show a user-friendly message
      }
    );
  }
}
