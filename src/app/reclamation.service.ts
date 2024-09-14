import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private apiUrl = 'http://localhost:8080/api/reclamation/create';

  constructor(private http: HttpClient) { }

  createReclamation(reclamation: { title: string; description: string }): Observable<any> {
    return this.http.post(this.apiUrl, reclamation);
  }
}
