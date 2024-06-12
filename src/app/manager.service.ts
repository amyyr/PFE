import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from './models/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  addManager(newManager: Manager) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  // Method to get common headers
  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    } else {
      return new HttpHeaders();
    }
  }

  postManager(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`https://back.aitacticalanalysis.com/api/v1/auth/manager/signup${id}`, { headers });
  }

  getManagerById(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`https://back.aitacticalanalysis.com/api/manager/getById/${id}`, { headers });
  }



  updateManager(body: any, id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`https://back.aitacticalanalysis.com/api/manager/update/${id}`,{Headers});
  }

 


  deleteManager(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`https://back.aitacticalanalysis.com/api/manager/${id}`, {headers});
  }


  getAllManager(): Observable<Manager[]> {
    const headers = this.getHeaders();
    return this.http.get<Manager[]>('https://back.aitacticalanalysis.com/api/manager', {headers});
  }
}


// Fetch all managers /api/manager


// Update a manager

// Delete a manager