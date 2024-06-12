import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = 'https://back.aitacticalanalysis.com';
  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    } else {
      return new HttpHeaders();
    }
  }

  addTeam(team: any): Observable<any> {  //
    const headers = this.getHeaders();
    return this.http.post<any>('https://back.aitacticalanalysis.com/api/team/add', team, { headers });
  }

  getTeamById(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`https://back.aitacticalanalysis.com/api/team/${id}`, { headers });
  }

  getAllTeam(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>('https://back.aitacticalanalysis.com/api/team', { headers });
  }
  getTeamByManager(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`https://back.aitacticalanalysis.com/api/team/manager`, { headers });
  }

  getAllCountries(): Observable<any> {
    return this.http.get<any>('https://back.aitacticalanalysis.com/api/country/all'); 
  }

  getLeaguesByCountry(countryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/leagues/list`, { 
      params: { countryId: countryId } 
    });
  }

  getTeamsByLeague(leagueId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/teams/teams`, { 
      params: { leagueId: leagueId } 
    });
  }
  // getPlayersByTeam(teamId: number): Observable<any> {
  //   return this.http.get<any>(`https://back.aitacticalanalysis.com/api/teams/players`, {
  //     params: { teamId: teamId }
  //   });
  // }
  deleteTeam(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/api/team/${id}`, { headers });
  }

  updateTeam(body: any, id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/api/team/${id}`, body, { headers });
  }
  getPlayersByTeam(teamId: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/player/team/${teamId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
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
