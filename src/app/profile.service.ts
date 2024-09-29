import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Profile {
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;  // This should be a date in ISO format (e.g., "1990-01-01")
  sexe: string;      // Either 'male' or 'female'
  address: string;
  phone: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/manager/token'; // Make sure this is correct

  constructor(private http: HttpClient) {}

  getManagerToken(): Observable<Profile> {
    const token = localStorage.getItem('token');  // Ensure the token key matches the one in localStorage
    if (!token) {
      console.error('No token found! Please log in.');
      return throwError('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<Profile>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error occurred during profile fetch:', error);
        return throwError(error);
      })
    );
  }
}
