import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AdminAuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();  // Retrieve token from localStorage
    if (token) {
      console.log('Token found, proceeding to admin route:', token);
      return true;  // Allow access if the token exists
    } else {
      console.log('No token found, redirecting to login.');
 // Redirect to login if not authenticated
      return false;
    }
  }
}
