import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private matchDetailsSource = new BehaviorSubject<any>(null);
  matchDetails$ = this.matchDetailsSource.asObservable();

  setMatchDetails(details: any) {
    this.matchDetailsSource.next(details);
  }
}
