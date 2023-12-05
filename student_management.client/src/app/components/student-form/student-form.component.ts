// student-form.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

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

  constructor(private router: Router, private studentService: StudentService) { }

  ngOnInit(): void { }

  saveStudent(): void {
    this.studentService.createStudent(this.student).subscribe(() => {
      this.router.navigate(['/students']);
    });
  }
}
