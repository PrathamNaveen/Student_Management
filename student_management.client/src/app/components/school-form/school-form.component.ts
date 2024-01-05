// school-form.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolService } from '../../services/school.service';
import { School } from '../../models/school.model';

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.css'],
})
export class SchoolFormComponent implements OnInit {
  school: School = {
    schoolId: 0,
    schoolName: '',
    schoolLocation: '',
  };
  errorMessage: string = '';

  constructor(private router: Router, private schoolService: SchoolService) { }

  ngOnInit(): void { }

  saveSchool(): void {
    // Check for required fields
    if (!this.school.schoolName) {
      this.errorMessage = 'School Name is required.';
      return;
    }

    // Save school
    console.log('Sending school data:', this.school);
    this.schoolService.addSchool(this.school).subscribe(
      (createdSchool) => {
        console.log('School created successfully:', createdSchool);
        this.router.navigate(['/school-list']);
      },
      (error) => {
        this.errorMessage = 'Error creating school: ' + error;
        console.error('Error creating school:', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}
