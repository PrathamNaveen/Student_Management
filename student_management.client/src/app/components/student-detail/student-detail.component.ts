// student-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
})
export class StudentDetailComponent implements OnInit {
  student: Student | undefined;
  editMode = false;
  editedStudent: Partial<Student> = {}; 

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.loadStudent();
  }

  loadStudent(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudentById(id).subscribe((data) => {
      this.student = data;
      this.editedStudent = { ...data } as Partial<Student>; 
    });
  }

  toggleEdit(attribute: keyof Student): void {
    this.editMode = true;
  }

  saveChanges(attribute: keyof Student): void {
    if (!this.student) {
      return; // Handle the case where this.student is undefined
    }

    // Update only the specified property
    switch (attribute) {
      case 'firstName':
      case 'lastName':
      case 'gender':
      case 'email':
      case 'phoneNumber':
        this.student[attribute] = this.editedStudent[attribute] as string;
        break;
      // Add cases for other attributes as needed
    }

    // Call the service to update the student in the database
    this.studentService
      .updateStudent(this.student.studentId, this.student)
      .subscribe(() => {
        // After a successful update, exit edit mode
        this.editMode = false;
      });
  }
}
