import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './login.service';
 // Assuming LoginResponse is defined in login.service

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private userRole: string | null = null; // Store user role
  private baseUrl = 'http://localhost:8080/api/manager/password';
  private signUpUrl = 'http://localhost:8080/api/v1/auth/manager/signup';
  private signInUrl = 'http://localhost:8080/api/v1/auth/signin';

  constructor(private http: HttpClient) {}

  // Token and Role Management
  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }

  getUserRole(): string | null {
    return this.userRole;
  }
  

  // Registration
  registerUser(userData: any): Observable<any> {
    return this.http.post(this.signUpUrl, userData);
  }

  // Login
  loginUser(userData: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.signInUrl, userData);
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
