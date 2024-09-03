import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/manager';

  constructor(private http: HttpClient) {}

  getPendingManagers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pending`);
  }

 

  rejectManager(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/reject`, {});
  }

  deleteManager(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders();
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    return headers;
  }
  
}
