import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:8080/api/player';

  constructor(private http: HttpClient) {}

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  addPlayer(player: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/add`, player, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getPlayerById(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    const errorMessage = error.error instanceof ErrorEvent ?
      `An error occurred: ${error.error.message}` :
      `Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`;
    return throwError(() => new Error(errorMessage));
  }
  getAllPlayer(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}`, { headers });
  }

  getAllPlayerByManager(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/manager`, { headers });
  }

  deletePlayer(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  updatePlayer(body: any, id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  getPlayersByIdMatch(matchId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/match/id/players`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}
