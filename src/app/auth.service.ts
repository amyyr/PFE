import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from './login.service'; // Adjust this import if needed

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private userRole: string | null = null;
  private baseUrl = 'http://localhost:8080/api/manager/password';
  private signUpUrl = 'http://localhost:8080/api/v1/auth/manager/signup';
  private signInUrl = 'http://localhost:8080/api/v1/auth/signin';

  constructor(private http: HttpClient, private router: Router) {}

  // Token and Role Management
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token); // Store token in localStorage
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token'); // Get token from localStorage
    }
    return this.token;
  }

  setUserRole(role: string): void {
    this.userRole = role;
    localStorage.setItem('userRole', role); // Store role in localStorage
  }

  getUserRole(): string | null {
    if (!this.userRole) {
      this.userRole = localStorage.getItem('userRole'); // Get role from localStorage
    }
    return this.userRole;
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Check if token exists
  }

  // Registration
  registerUser(userData: any): Observable<any> {
    return this.http.post(this.signUpUrl, userData);
  }

  // Login
  loginUser(userData: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.signInUrl, userData);
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']); // Redirect to home or login page after logout
  }
  

  // Forgot Password
  forgotPassword(email: string): Observable<string> {
    const formData = new FormData();
    formData.append('email', email);
    return this.http.post(`${this.baseUrl}/forgot-password`, formData, { responseType: 'text' });
  }

  resetPassword(data: { token: string, password: string }): Observable<string> {
    const formData = new FormData();
    formData.append('token', data.token);
    formData.append('password', data.password);
    return this.http.put(`${this.baseUrl}/reset-password`, formData, { responseType: 'text' });
  }
}
