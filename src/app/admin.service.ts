import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/manager';
  private adminData: any = null;
  private abiUrl = 'http://localhost:8080/api/admin/token';

  constructor(private http: HttpClient) {}

  getPendingManagers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pending`);
  }

 

  rejectManager(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/reject`, {});
  }

  deleteManager(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/archiver/${id}`);
  }
  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('adminToken'); 
    let headers = new HttpHeaders();
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    return headers;
  }
  setAdminData(data: any) {
    this.adminData = data;
  }

 

  getAdminData(): Observable<any> {
    const token = localStorage.getItem('adminToken');  // Retrieve adminToken from localStorage

    // Ensure the token exists
    if (!token) {
      throw new Error('No token found');
    }

    // Prepare the headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make the API call to fetch admin data
    return this.http.get<any>(this.abiUrl, { headers });
  }
  
}
