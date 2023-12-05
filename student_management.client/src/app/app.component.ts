import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <h1>Welcome to Student Management</h1>
    </header>
    <nav>
      <a routerLink="/students">Student List</a>
      <a routerLink="/add-student">Add Student</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      header {
        background-color: #333;
        color: white;
        text-align: center;
        padding: 1rem;
      }

      nav {
        background-color: #eee;
        padding: 0.5rem;
        display: flex;
        justify-content: space-around;
      }

      a {
        text-decoration: none;
        color: #333;
        font-weight: bold;
      }

      a:hover {
        color: #007bff;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Student Management';
}
