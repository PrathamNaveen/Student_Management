// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentDetailComponent,
    StudentFormComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
