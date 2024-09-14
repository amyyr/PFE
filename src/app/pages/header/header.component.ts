import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) {}

  // Check if the user is logged in by verifying if the token is stored in localStorage
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Logout functionality to clear token and redirect to the homepage
  logout(): void {
    localStorage.removeItem('token'); // Remove token from localStorage
    this.router.navigate(['/']); // Navigate back to the home page or login
  }
}
