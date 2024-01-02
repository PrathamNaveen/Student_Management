// school-list.component.ts

import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css'],
})
export class SchoolListComponent implements OnInit {
  schools: any[] = [];

  constructor(private schoolService: SchoolService) { }

  ngOnInit(): void {
    this.loadSchools();
  }

  loadSchools(): void {
    this.schoolService.getSchools().subscribe(
      (data: any) => {
        this.schools = data.$values;
      },
      (error) => {
        console.error('Error loading schools:', error);
      }
    );
  }
}
