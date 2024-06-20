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
  private actionApiUrl = 'https://back.aitacticalanalysis.com/api/action';

  constructor(private http: HttpClient) {}
  

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  addMatch(match: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/add`, match, { headers })
      .pipe(catchError(this.handleError));
  }

  getMatchById(id: any): Observable<any> {
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

  updateMatch(id: any, match: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, match, { headers })
      .pipe(catchError(this.handleError));
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

  
  getPlayersByIdMatch(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/${id}/players`, { headers })
      .pipe(
        catchError(error => {
          console.error('An error occurred:', error);
          return throwError(() => error);
        })
      );
  }
  getMatchByNames(name:string): Observable<any> { 
    const headers = this.getHeaders(); 
    return this.http.get<any>(`https://back.aitacticalanalysis.com/api/match/names${name}`,{headers}); 
  } 



  getMatchByIdNames(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`https://back.aitacticalanalysis.com/api/match/id/names`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  addAction(action: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.actionApiUrl}/add`, action, { headers })
      .pipe(catchError(this.handleError));
  }
  getPlayerStatistics(playerId: number, matchId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.actionApiUrl}/statistique/player/${playerId}/match/${matchId}`, { headers })
      .pipe(catchError(this.handleError));
  }
  
  deleteAction(actionId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.actionApiUrl}/${actionId}`, { headers })
      .pipe(catchError(this.handleError));
  }
  
  getPlayerActions(playerId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.actionApiUrl}/player/${playerId}`, { headers })
      .pipe(catchError(this.handleError));
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
  
}
