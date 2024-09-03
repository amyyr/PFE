import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private loginUrl = 'http://localhost:8080/api/v1/auth/signin/admin';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Make the POST request to login and use tap to store the token upon a successful response
    return this.http.post(this.loginUrl, JSON.stringify(body), { headers })
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            this.saveToken(response.token);
          }
        })
      );
  }

  // Save the token to localStorage
  saveToken(token: string): void {
    localStorage.setItem('adminToken', token);
  }

  // Retrieve the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('adminToken');
  }

  // Clear the token from localStorage
  logout(): void {
    localStorage.removeItem('adminToken');
  }
}
