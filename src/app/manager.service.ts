import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from './models/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('adminToken');
    // Ensure the token exists and is valid
    if (token) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    } else {
      console.error('Token not found in local storage.');
      return new HttpHeaders(); // Handle missing token appropriately
    }
  }
  

  getAllManagers(): Observable<Manager[]> {
    const headers = this.getHeaders();
    return this.http.get<Manager[]>('http://localhost:8080/api/manager', { headers });
  }

  approveManager(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`http://localhost:8080/api/manager/${id}/approve`, {}, { headers });
  }
  
  rejectManager(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`http://localhost:8080/api/manager/${id}/reject`, {}, { headers });
  }
  suspendreManager(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`http://localhost:8080/api/manager/${id}/suspendre`, {}, { headers });
  }
  
  deleteManager(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`http://localhost:8080/api/manager/${id}`, { headers });
  }

  getManagerById(id: string): Observable<Manager> {
    const headers = this.getHeaders();
    return this.http.get<Manager>(`http://localhost:8080/api/manager/getById/${id}`, { headers });
  }

  addManager(newManager: Manager): Observable<Manager> {
    const headers = this.getHeaders();
    return this.http.post<Manager>(`http://localhost:8080/api/manager`, newManager, { headers });
  }

  updateManager(body: any, id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`http://localhost:8080/api/manager/update/${id}`, body, { headers });
  }
  getReclamations(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>('http://localhost:8080/api/reclamation/all', { headers });
  }
  
  getReclamationById(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`http://localhost:8080/api/reclamation/${id}`, { headers });
  }
  getManagerImageBlob(id: string): Observable<Blob> {
    const headers = this.getHeaders();
    return this.http.get(`http://localhost:8080/api/image/manager/${id}/image`, {
      headers: headers,
      responseType: 'blob' // Get the image as Blob
    });
  }
}
