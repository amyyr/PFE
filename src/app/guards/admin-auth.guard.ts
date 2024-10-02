import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists, allow access
      return true;
    } else {
      // No token, redirect to login
      this.router.navigate(['admin/login']);
      return false;
    }
  }
}
