import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'https://back.aitacticalanalysis.com/api/player';

  constructor(private http: HttpClient) {}

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    } else {
      return new HttpHeaders();
    }
  }

  addPlayer(player: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/add`, player, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getPlayerById(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    let errorMessage = 'Something went wrong; please try again later.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  getAllPlayer(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}`, { headers });
  }

  getAllPlayerByManger(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get("https://back.aitacticalanalysis.com/api/team/manager", { headers });
  }

  deletePlayer(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  updatePlayer(body: any, id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, body, { headers });
  }
  getPlayersByIdMatch(matchId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`http://localhost:8080/api/match/id/players`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
}
