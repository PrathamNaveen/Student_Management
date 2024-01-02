// school.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { School } from '../models/school.model';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private schoolsUrl = 'https://localhost:7067/api/schools';

  constructor(private http: HttpClient) { }

  getSchools(): Observable<School[]> {
    return this.http.get<School[]>(this.schoolsUrl);
  }

  addSchool(newSchool: School): Observable<School> {
    const body = JSON.stringify(newSchool);
    return this.http.post<School>(this.schoolsUrl, body, { headers: { 'Content-Type': 'application/json' } });
  }

}
