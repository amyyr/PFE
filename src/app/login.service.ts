import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Updated interface to include role
export interface LoginResponse {
  accessToken: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private signInUrl = 'http://localhost:8080/api/v1/auth/signin/manager'; // API URL

  constructor(private http: HttpClient) {}

  // Login method that returns the correct LoginResponse
  loginUser(userData: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.signInUrl, userData);
  }
}
