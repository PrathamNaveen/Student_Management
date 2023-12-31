// student-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  isHovered = false;

  constructor(private router: Router, private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (data: any) => {
        console.log('Received data from API:', data);

        if (data.$values && Array.isArray(data.$values)) {
          this.students = data.$values;
        } else {
          console.error('Invalid data format:', data);
        }
      },
      (error) => {
        console.error('Error loading students:', error);
      }
    );
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(
      () => {
        console.log(`Student with ID ${id} deleted successfully.`);
        this.loadStudents(); 
      },
      (error) => {
        console.error(`Error deleting student with ID ${id}: ${error}`);
      }
    );
  }

  showStudentDetails(student: Student): void {
    this.router.navigate(['/edit-student', student.studentId]);
  }

  addNewStudent(): void {
    this.router.navigate(['/add-student']);
  }

  addNewSchool(): void {
    this.router.navigate(['/add-school']);
  }

  listAllSchools(): void {
    this.router.navigate(['/school-list']);
  }

  togglePointer(isHovered: boolean): void {
    this.isHovered = isHovered;
  }
}
