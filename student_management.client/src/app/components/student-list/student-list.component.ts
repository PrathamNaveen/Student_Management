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
      (data) => {
        this.students = data;
      },
      (error) => {
        console.error('Error loading students:', error);
        // Handle error as needed, e.g., show a user-friendly message
      }
    );
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(
      () => {
        console.log(`Student with ID ${id} deleted successfully.`);
        this.loadStudents(); // Reload the list after deletion
      },
      (error) => {
        console.error(`Error deleting student with ID ${id}: ${error}`);
        // Handle error as needed, e.g., show a user-friendly message
      }
    );
  }

  showStudentDetails(id: number, name: string): void {
    // Make your API call to display student details here
    this.studentService.getStudentById(id).subscribe(
      (data) => {
        console.log('Student details:', data);
        // Redirect to student details page with ID
        this.router.navigate(['/students', id]);
      },
      (error) => {
        console.error(`Error fetching details for student with ID ${id}: ${error}`);
        // Handle error as needed, e.g., show a user-friendly message
      }
    );
  }

  editStudent(id: number): void {
    // Make your API call to edit student details here
    this.router.navigate(['/edit-student', id]);
  }

  togglePointer(isHovered: boolean): void {
    this.isHovered = isHovered;
  }
}
