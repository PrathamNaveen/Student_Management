// Import necessary modules
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { SchoolService } from '../../services/school.service';
import { Student } from '../../models/student.model';
import { Course } from '../../models/course.model';
import { School } from '../../models/school.model';

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
    schoolId: 0
  };
  courses!: any[];
  schools!: any[];
  errorMessage: string = ''; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private courseService: CourseService,
    private schoolService: SchoolService
  ) { }

  ngOnInit(): void {
    this.loadCourses();
    this.loadSchools();

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

  loadSchools(): void {
    this.schoolService.getSchools().subscribe(
      (data: any) => {
        this.schools = data.$values;
      },
      (error) => {
        console.error('Error fetching schools:', error);
      }
    );
  }

  saveStudent(): void {
    // Check for required fields
    if (!this.validateRequiredFields()) {
      this.errorMessage = 'Required fields are not filled.';
      return;
    }

    // Check for valid email format
    if (!this.validateEmailFormat()) {
      this.errorMessage = 'Invalid email format.';
      return;
    }

    // Edit
    if (this.student.studentId) {
      this.studentService.updateStudent(this.student.studentId, this.student).subscribe(
        () => {
          this.router.navigate(['/students']);
        },
        (error) => {
          this.errorMessage = 'Error updating student: ' + error;
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
          this.errorMessage = 'Error saving student: ' + error;
        }
      );
    }
  }

  validateRequiredFields(): boolean {
    return (
      this.student.firstName.trim() !== '' &&
      this.student.lastName.trim() !== '' &&
      this.student.email.trim() !== '' &&
      this.student.courseId !== 0 &&
      this.student.schoolId !== 0
    );
  }

  validateEmailFormat(): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailPattern.test(this.student.email.trim());
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}
