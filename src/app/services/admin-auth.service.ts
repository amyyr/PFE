import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private loginUrl = 'http://localhost:8080/api/v1/auth/signin/admin';  // Your backend API

  constructor(private http: HttpClient) {}

  // Login method
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.loginUrl, body, { headers }).pipe(
      tap((response: any) => {
        console.log('Login response:', response);  // Log the full response
        if (response && response.accessToken) {    // Use accessToken here
          this.saveToken(response.accessToken);    // Save the accessToken
          console.log('Token saved:', response.accessToken);  // Log saved token
        } else {
          console.error('No accessToken found in response');
          throw new Error('No accessToken found in the login response');
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);  // Log the error
        return throwError(error);  // Propagate the error
      })
    );
  }

  // Save the token to localStorage
  saveToken(token: string): void {
    console.log('Saving token to localStorage:', token);  // Log the token being saved
    localStorage.setItem('adminToken', token);
  }

  // Retrieve the token from localStorage
  getToken(): string | null {
    const token = localStorage.getItem('adminToken');
    console.log('Retrieved token from localStorage:', token);  // Log the retrieved token
    return token;
  }

  // Clear the token from localStorage
  logout(): void {
    console.log('Clearing token from localStorage');
    localStorage.removeItem('adminToken');
  }
}
