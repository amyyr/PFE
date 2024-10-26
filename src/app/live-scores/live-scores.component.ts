import { Component, OnInit, OnDestroy } from '@angular/core';
import { LiveScoreService } from '../live-score.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-live-scores',
  templateUrl: './live-scores.component.html',
  styleUrls: ['./live-scores.component.css']
})
export class LiveScoresComponent implements OnInit, OnDestroy {
  scores: any[] = [];
  displayScores: any[] = [];
  itemsToShow = 10;
  showButton = true;
  private pollingSubscription: Subscription | null = null;

  constructor(private liveScoreService: LiveScoreService) {}

  ngOnInit(): void {
    // Initial data fetch
    this.fetchScores();

    // Poll for updates every 10 seconds
    this.pollingSubscription = interval(10000) // 10-second interval
      .pipe(switchMap(() => this.liveScoreService.getLiveScores())) // fetches scores on each interval
      .subscribe(data => {
        if (data.success === 1) {
          this.updateScores(data.result);
          this.updateDisplayScores();
        }
      });
  }

  fetchScores(): void {
    // Initial fetch of live scores
    this.liveScoreService.getLiveScores().subscribe(data => {
      if (data.success === 1) {
        this.scores = data.result.map((score: any) => this.parseScore(score));
        this.updateDisplayScores();
      }
    });
  }

  parseScore(score: any): any {
    const [homeScore, awayScore] = (score.event_final_result || '0 - 0').split(' - ').map(Number);
    score.homeScore = homeScore || 0;
    score.awayScore = awayScore || 0;
    score.previousHomeScore = score.homeScore; // Store initial score
    score.previousAwayScore = score.awayScore;
    score.highlight = false; // No highlight initially
    return score;
  }

  updateScores(newScores: any[]): void {
    newScores.forEach((newScore, index) => {
      const oldScore = this.scores[index];
      const [newHomeScore, newAwayScore] = (newScore.event_final_result || '0 - 0').split(' - ').map(Number);

      // Check if the score has changed
      if (oldScore && (newHomeScore !== oldScore.homeScore || newAwayScore !== oldScore.awayScore)) {
        oldScore.previousHomeScore = oldScore.homeScore;
        oldScore.previousAwayScore = oldScore.awayScore;
        oldScore.homeScore = newHomeScore;
        oldScore.awayScore = newAwayScore;
        oldScore.highlight = true; // Set highlight to true for changed score

        // Remove highlight after 10 seconds
        setTimeout(() => {
          oldScore.highlight = false;
        }, 10000);
      }
    });
  }

  updateDisplayScores(): void {
    this.displayScores = this.scores.slice(0, this.itemsToShow);
    this.showButton = this.itemsToShow < this.scores.length;
  }

  loadMore(): void {
    this.itemsToShow = this.scores.length;
    this.updateDisplayScores();
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  // Helper method to check if a value is a number
  isNumber(value: any): boolean {
    return !isNaN(Number(value));
  }
}
