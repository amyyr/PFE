import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveScoreService {
  private apiUrl = 'https://back.aitacticalanalysis.com/api/liveScore/all';

  constructor(private http: HttpClient) {}

  getLiveScores(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
