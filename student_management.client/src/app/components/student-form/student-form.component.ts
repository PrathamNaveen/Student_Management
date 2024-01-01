// Import necessary modules
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { Student } from '../../models/student.model';
import { Course } from '../../models/course.model';

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
  courses!: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private studentService: StudentService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.loadCourses();

    this.route.params.subscribe((params) => {
      const studentId = params['id'];
      if (studentId) {
        this.loadStudentDetails(studentId);
      }
    });
  }

  loadStudentDetails(studentId: number): void {
    this.studentService.getStudentById(studentId).subscribe(
      (data: any) => {
        this.student = data;
      },
      (error) => {
        console.error('Error fetching student details:', error);
      }
    );
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(
      (data: any) => {
        this.courses = data.$values;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  saveStudent(): void {
    // Edit
    if (this.student.studentId) {
      this.studentService.updateStudent(this.student.studentId, this.student).subscribe(
        () => {
          this.router.navigate(['/students']);
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
    }
    // Add
    else {
      this.studentService.createStudent(this.student).subscribe(
        () => {
          this.router.navigate(['/students']);
        },
        (error) => {
          console.error('Error saving student:', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}
