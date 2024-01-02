import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { SchoolFormComponent } from './components/school-form/school-form.component';

const routes: Routes = [
  { path: 'students', component: StudentListComponent },
  { path: 'students/:id', component: StudentDetailComponent },
  { path: 'add-student', component: StudentFormComponent },
  { path: 'edit-student/:id', component: StudentFormComponent },
  { path: 'school-list', component: SchoolListComponent },
  { path: 'add-school', component: SchoolFormComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
