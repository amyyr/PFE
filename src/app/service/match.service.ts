import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Match } from '../models/match';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private apiUrl = 'https://back.aitacticalanalysis.com/api/match';

  constructor(private http: HttpClient) {}
  

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    } else {
      return new HttpHeaders();
    }
  }

  addMatch(match: Match): Observable<any> { 
    const headers = this.getHeaders(); 
    return this.http.post<any>('https://back.aitacticalanalysis.com/api/match/add', match, {headers}); 
  } 

  getMatchById(id: any): Observable<any> { 
    const headers = this.getHeaders(); 
    return this.http.get<any>(`https://back.aitacticalanalysis.com/api/match/${id}`,{headers}); 
  } 

  getPlayerById(id: string): Observable<any> { 
    const headers = this.getHeaders(); 
    return this.http.get<any>(`https://back.aitacticalanalysis.com/api/match/${id}`,{headers}); 
  } 

  getAll(): Observable<any> { 
    const headers = this.getHeaders(); 
    return this.http.get<any>('https://back.aitacticalanalysis.com/api/match',{headers}); 
  } 

  getAllByManager(): Observable<any> { 
    const headers = this.getHeaders(); 
    return this.http.get<any>('https://back.aitacticalanalysis.com/api/match/manager', { headers }); 
  } 

  deleteMatch(id: any): Observable<any> { 
    const headers = this.getHeaders(); 
    return this.http.delete<any>(`https://back.aitacticalanalysis.com/api/match/${id}`,{headers}); 
  } 

  updateMatch(id: any,match: Match): Observable<any> { 
    const headers = this.getHeaders(); 
    return this.http.put<any>(`https://back.aitacticalanalysis.com/api/match/${id}`, match, { headers }); 
  } 

  getAllTeam(): Observable<any> { 
    const headers = this.getHeaders(); 
    return this.http.get<any>('https://back.aitacticalanalysis.com/api/team', { headers }); 
  
  }

  private matchDetailsSource = new BehaviorSubject<any>(null);
  matchDetails$ = this.matchDetailsSource.asObservable();

  setMatchDetails(details: any) {
    this.matchDetailsSource.next(details);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    let errorMessage = 'Something went wrong; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`;
    }
    console.error('Full error response:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  getPlayersByIdMatch(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`http://localhost:8080/api/match/${id}/players`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  getMatchByNames(name:string): Observable<any> { 
    const headers = this.getHeaders(); 
    return this.http.get<any>(`http://localhost:8080/api/match/names${name}`,{headers}); 
  } 



  getMatchByIdNames(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`http://localhost:8080/api/match/id/names`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
}
